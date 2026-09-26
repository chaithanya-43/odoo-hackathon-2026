const pool=require("../config/db");
const StockService=require("./stockService");
const LedgerService=require("./ledgerService");

const DeliveryService={
 async getAllDeliveries(){
  const [r]=await pool.query(`SELECT d.*,l.name AS location_name FROM deliveries d JOIN locations l ON l.id=d.location_id ORDER BY d.id DESC`);
  return r;
 },
 async getDeliveryById(id){
  const [r]=await pool.query(`SELECT d.*,l.name AS location_name FROM deliveries d JOIN locations l ON l.id=d.location_id WHERE d.id=?`,[id]);
  if(!r.length)return null;
  const [items]=await pool.query(`SELECT di.*,p.name AS product_name,p.sku FROM delivery_items di JOIN products p ON p.id=di.product_id WHERE di.delivery_id=?`,[id]);
  return {...r[0],items};
 },
 async createDelivery({reference_no,customer,location_id,items,created_by}){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`INSERT INTO deliveries(reference_no,customer,location_id,created_by) VALUES(?,?,?,?)`,
    [reference_no,customer||null,location_id,created_by||null]);
   for(const i of items)await c.query(`INSERT INTO delivery_items(delivery_id,product_id,quantity) VALUES(?,?,?)`,
    [r.insertId,i.product_id,i.quantity]);
   await c.commit();return this.getDeliveryById(r.insertId);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 },
 async validateDelivery(id,userId){
  const c=await pool.getConnection();
  try{
   await c.beginTransaction();
   const [r]=await c.query(`SELECT * FROM deliveries WHERE id=? FOR UPDATE`,[id]);
   if(!r.length)throw new Error("Delivery not found");
   if(r[0].status!=="draft")throw new Error("Delivery has already been processed");
   const [items]=await c.query(`SELECT * FROM delivery_items WHERE delivery_id=?`,[id]);
   if(!items.length)throw new Error("Delivery has no items");
   for(const i of items){
    await StockService.decreaseStock(i.product_id,r[0].location_id,Number(i.quantity),c);
    await LedgerService.createEntry({productId:i.product_id,locationId:r[0].location_id,
     movementType:"delivery",quantityChange:-Number(i.quantity),referenceType:"delivery",
     referenceId:id,note:`Delivery ${r[0].reference_no}`,createdBy:userId||r[0].created_by,connection:c});
   }
   await c.query(`UPDATE deliveries SET status='validated' WHERE id=?`,[id]);
   await c.commit();return this.getDeliveryById(id);
  }catch(e){await c.rollback();throw e}finally{c.release()}
 }
};
module.exports=DeliveryService;
