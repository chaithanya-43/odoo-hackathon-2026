const pool=require("../config/db");
const StockService=require("./stockService");
const LedgerService=require("./ledgerService");

const TransferService={
 async getAllTransfers(){
  const [r]=await pool.query(`SELECT t.*,s.name AS source_location_name,d.name AS destination_location_name
   FROM transfers t JOIN locations s ON s.id=t.source_location_id JOIN locations d ON d.id=t.destination_location_id ORDER BY t.id DESC`);
  return r;
 },
 async getTransferById(id){
  const [r]=await pool.query(`SELECT t.*,s.name AS source_location_name,d.name AS destination_location_name
   FROM transfers t JOIN locations s ON s.id=t.source_location_id JOIN locations d ON d.id=t.destination_location_id WHERE t.id=?`,[id]);
  if(!r.length)return null;
  const [items]=await pool.query(`SELECT ti.*,p.name AS product_name,p.sku FROM transfer_items ti JOIN products p ON p.id=ti.product_id WHERE ti.transfer_id=?`,[id]);
  return {...r[0],items};
 },
 async createTransfer({reference_no,source_location_id,destination_location_id,items,created_by}){
  if(Number(source_location_id)===Number(destination_location_id))throw new Error("Source and destination must be different");
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`INSERT INTO transfers(reference_no,source_location_id,destination_location_id,created_by) VALUES(?,?,?,?)`,
    [reference_no,source_location_id,destination_location_id,created_by||null]);
   for(const i of items)await c.query(`INSERT INTO transfer_items(transfer_id,product_id,quantity) VALUES(?,?,?)`,
    [r.insertId,i.product_id,i.quantity]);
   await c.commit();return this.getTransferById(r.insertId);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 },
 async validateTransfer(id,userId){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`SELECT * FROM transfers WHERE id=? FOR UPDATE`,[id]);
   if(!r.length)throw new Error("Transfer not found");
   if(r[0].status!=="draft")throw new Error("Transfer has already been processed");
   const [items]=await c.query(`SELECT * FROM transfer_items WHERE transfer_id=?`,[id]);
   if(!items.length)throw new Error("Transfer has no items");
   for(const i of items){
    await StockService.decreaseStock(i.product_id,r[0].source_location_id,Number(i.quantity),c);
    await StockService.increaseStock(i.product_id,r[0].destination_location_id,Number(i.quantity),c);
    await LedgerService.createEntry({productId:i.product_id,locationId:r[0].source_location_id,
     movementType:"transfer_out",quantityChange:-Number(i.quantity),referenceType:"transfer",
     referenceId:id,note:`Transfer ${r[0].reference_no}`,createdBy:userId||r[0].created_by,connection:c});
    await LedgerService.createEntry({productId:i.product_id,locationId:r[0].destination_location_id,
     movementType:"transfer_in",quantityChange:Number(i.quantity),referenceType:"transfer",
     referenceId:id,note:`Transfer ${r[0].reference_no}`,createdBy:userId||r[0].created_by,connection:c});
   }
   await c.query(`UPDATE transfers SET status='validated' WHERE id=?`,[id]);
   await c.commit();return this.getTransferById(id);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 }
};
module.exports=TransferService;
