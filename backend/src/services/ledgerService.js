const pool=require("../config/db");

const LedgerService={
    async createEntry({productId,locationId,movementType,quantityChange,
        referenceType,referenceId,note,createdBy,connection=pool}){
        const [r]=await connection.query(`
            INSERT INTO stock_ledger
            (product_id,location_id,movement_type,quantity_change,
             reference_type,reference_id,note,created_by)
            VALUES(?,?,?,?,?,?,?,?)
        `,[productId,locationId,movementType,quantityChange,
           referenceType||null,referenceId||null,note||null,createdBy||null]);
        return {id:r.insertId};
    },
    async getEntries(filters={}){
        let sql=`
            SELECT sl.*,p.name AS product_name,p.sku,l.name AS location_name
            FROM stock_ledger sl
            JOIN products p ON p.id=sl.product_id
            JOIN locations l ON l.id=sl.location_id
            WHERE 1=1`;
        const params=[];
        if(filters.product_id){sql+=" AND sl.product_id=?";params.push(filters.product_id);}
        if(filters.location_id){sql+=" AND sl.location_id=?";params.push(filters.location_id);}
        sql+=" ORDER BY sl.id DESC";
        const [rows]=await pool.query(sql,params);
        return rows;
    }
};

module.exports=LedgerService;
