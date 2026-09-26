const pool=require("../config/db");
const DashboardService={
 async getDashboard(){
  const [[products]] = await pool.query(`SELECT COUNT(*) AS count FROM products`);
  const [[locations]] = await pool.query(`SELECT COUNT(*) AS count FROM locations`);
  const [[stock]] = await pool.query(`SELECT COALESCE(SUM(quantity),0) AS quantity FROM stock`);
  const [[low]] = await pool.query(`
   SELECT COUNT(*) AS count FROM (
    SELECT p.id FROM products p
    LEFT JOIN stock s ON s.product_id=p.id
    GROUP BY p.id,p.reorder_level
    HAVING COALESCE(SUM(s.quantity),0)<=p.reorder_level
   ) x`);
  return {
   products:Number(products.count),
   locations:Number(locations.count),
   total_stock:Number(stock.quantity),
   low_stock:Number(low.count)
  };
 }
};
module.exports=DashboardService;
