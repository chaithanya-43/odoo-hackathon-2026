const pool=require("../config/db");
const StockService=require("./stockService");
const LedgerService=require("./ledgerService");

const AdjustmentService={
 async getAllAdjustments(){
  const [r]=await pool.query(`SELECT a.*,l.name AS location_name FROM adjustments a JOIN locations l ON l.id=a.location_id ORDER BY a.id DESC`);
  return r;
 },
 async getAdjustmentById(id){
  const [r]=await pool.query(`SELECT a.*,l.name AS location_name FROM adjustments a JOIN locations l ON l.id=a.location_id WHERE a.id=?`,[id]);
  if(!r.length)return null;
  const [items]=await pool.query(`SELECT ai.*,p.name AS product_name,p.sku FROM adjustment_items ai JOIN products p ON p.id=ai.product_id WHERE ai.adjustment_id=?`,[id]);
  return {...r[0],items};
 },
 async createAdjustment({reference_no,location_id,reason,items,created_by}){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`INSERT INTO adjustments(reference_no,location_id,reason,created_by) VALUES(?,?,?,?)`,
    [reference_no,location_id,reason||null,created_by||null]);
   for(const i of items)await c.query(`INSERT INTO adjustment_items(adjustment_id,product_id,physical_quantity) VALUES(?,?,?)`,
    [r.insertId,i.product_id,i.physical_quantity]);
   await c.commit();return this.getAdjustmentById(r.insertId);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 },
 async validateAdjustment(id,userId){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`SELECT * FROM adjustments WHERE id=? FOR UPDATE`,[id]);
   if(!r.length)throw new Error("Adjustment not found");
   if(r[0].status!=="draft")throw new Error("Adjustment has already been processed");
   const [items]=await c.query(`SELECT * FROM adjustment_items WHERE adjustment_id=?`,[id]);
   for(const i of items){
    const old=await StockService.getOrCreateStock(i.product_id,r[0].location_id,c);
    const change=Number(i.physical_quantity)-Number(old.quantity);
    await StockService.setStock(i.product_id,r[0].location_id,Number(i.physical_quantity),c);
    await LedgerService.createEntry({productId:i.product_id,locationId:r[0].location_id,
     movementType:"adjustment",quantityChange:change,referenceType:"adjustment",
     referenceId:id,note:`Adjustment ${r[0].reference_no}`,createdBy:userId||r[0].created_by,connection:c});
   }
   await c.query(`UPDATE adjustments SET status='validated' WHERE id=?`,[id]);
   await c.commit();return this.getAdjustmentById(id);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 }
};
module.exports=AdjustmentService;
