const pool = require("../config/db");

const ProductService = {
    async getAllProducts() {
        const [rows] = await pool.query(`
            SELECT p.id,p.name,p.sku,p.category_id,c.name AS category_name,
                   p.uom,p.reorder_level,p.created_at,p.updated_at
            FROM products p
            LEFT JOIN categories c ON c.id=p.category_id
            ORDER BY p.id DESC
        `);
        return rows;
    },
    async getProductById(id) {
        const [rows] = await pool.query(`
            SELECT p.id,p.name,p.sku,p.category_id,c.name AS category_name,
                   p.uom,p.reorder_level,p.created_at,p.updated_at
            FROM products p
            LEFT JOIN categories c ON c.id=p.category_id
            WHERE p.id=?
        `,[id]);
        return rows[0] || null;
    },
    async createProduct({name,sku,category_id,uom="Units",reorder_level=0}) {
        const [r] = await pool.query(`
            INSERT INTO products(name,sku,category_id,uom,reorder_level)
            VALUES(?,?,?,?,?)
        `,[name,sku,category_id||null,uom,reorder_level]);
        return this.getProductById(r.insertId);
    },
    async updateProduct(id,{name,sku,category_id,uom,reorder_level}) {
        const [r] = await pool.query(`
            UPDATE products SET name=?,sku=?,category_id=?,uom=?,reorder_level=?
            WHERE id=?
        `,[name,sku,category_id||null,uom,reorder_level,id]);
        return r.affectedRows ? this.getProductById(id) : null;
    }
};

module.exports=ProductService;
