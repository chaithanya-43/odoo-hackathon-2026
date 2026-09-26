const pool=require("../config/db");
const StockService=require("./stockService");
const LedgerService=require("./ledgerService");

const ReceiptService={
 async getAllReceipts(){
  const [r]=await pool.query(`SELECT r.*,l.name AS location_name FROM receipts r JOIN locations l ON l.id=r.location_id ORDER BY r.id DESC`);
  return r;
 },
 async getReceiptById(id){
  const [r]=await pool.query(`SELECT r.*,l.name AS location_name FROM receipts r JOIN locations l ON l.id=r.location_id WHERE r.id=?`,[id]);
  if(!r.length)return null;
  const [items]=await pool.query(`SELECT ri.*,p.name AS product_name,p.sku FROM receipt_items ri JOIN products p ON p.id=ri.product_id WHERE ri.receipt_id=?`,[id]);
  return {...r[0],items};
 },
 async createReceipt({reference_no,supplier,location_id,items,created_by}){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`INSERT INTO receipts(reference_no,supplier,location_id,created_by) VALUES(?,?,?,?)`,
    [reference_no,supplier||null,location_id,created_by||null]);
   for(const i of items) await c.query(`INSERT INTO receipt_items(receipt_id,product_id,quantity) VALUES(?,?,?)`,
    [r.insertId,i.product_id,i.quantity]);
   await c.commit(); return this.getReceiptById(r.insertId);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 },
 async validateReceipt(id,userId){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`SELECT * FROM receipts WHERE id=? FOR UPDATE`,[id]);
   if(!r.length)throw new Error("Receipt not found");
   if(r[0].status!=="draft")throw new Error("Receipt has already been processed");
   const [items]=await c.query(`SELECT * FROM receipt_items WHERE receipt_id=?`,[id]);
   if(!items.length)throw new Error("Receipt has no items");
   for(const i of items){
    await StockService.increaseStock(i.product_id,r[0].location_id,Number(i.quantity),c);
    await LedgerService.createEntry({productId:i.product_id,locationId:r[0].location_id,
     movementType:"receipt",quantityChange:Number(i.quantity),referenceType:"receipt",
     referenceId:id,note:`Receipt ${r[0].reference_no}`,createdBy:userId||r[0].created_by,connection:c});
   }
   await c.query(`UPDATE receipts SET status='validated' WHERE id=?`,[id]);
   await c.commit(); return this.getReceiptById(id);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 }
};
module.exports=ReceiptService;
