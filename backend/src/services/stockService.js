const pool=require("../config/db");

const StockService={
    async getStock(productId,locationId,connection=pool){
        const [rows]=await connection.query(
            `SELECT id,product_id,location_id,quantity FROM stock
             WHERE product_id=? AND location_id=? FOR UPDATE`,
            [productId,locationId]);
        return rows[0]||null;
    },
    async getOrCreateStock(productId,locationId,connection=pool){
        let s=await this.getStock(productId,locationId,connection);
        if(!s){
            await connection.query(
                `INSERT INTO stock(product_id,location_id,quantity) VALUES(?,?,0)`,
                [productId,locationId]);
            s=await this.getStock(productId,locationId,connection);
        }
        return s;
    },
    async increaseStock(productId,locationId,quantity,connection=pool){
        if(Number(quantity)<=0) throw new Error("Quantity must be greater than zero");
        await this.getOrCreateStock(productId,locationId,connection);
        await connection.query(
            `UPDATE stock SET quantity=quantity+? WHERE product_id=? AND location_id=?`,
            [quantity,productId,locationId]);
        return this.getStock(productId,locationId,connection);
    },
    async decreaseStock(productId,locationId,quantity,connection=pool){
        if(Number(quantity)<=0) throw new Error("Quantity must be greater than zero");
        const s=await this.getStock(productId,locationId,connection);
        if(!s) throw new Error("Stock record not found");
        if(Number(s.quantity)<Number(quantity)) throw new Error("Insufficient stock");
        await connection.query(
            `UPDATE stock SET quantity=quantity-? WHERE product_id=? AND location_id=?`,
            [quantity,productId,locationId]);
        return this.getStock(productId,locationId,connection);
    },
    async setStock(productId,locationId,quantity,connection=pool){
        if(Number(quantity)<0) throw new Error("Physical quantity cannot be negative");
        await this.getOrCreateStock(productId,locationId,connection);
        await connection.query(
            `UPDATE stock SET quantity=? WHERE product_id=? AND location_id=?`,
            [quantity,productId,locationId]);
        return this.getStock(productId,locationId,connection);
    }
};

module.exports=StockService;
