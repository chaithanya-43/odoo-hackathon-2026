const pool = require("../config/db");
const StockService = require("./stockService");
const LedgerService = require("./ledgerService");

const ReceiptService = {
    async getAllReceipts() {
        const [rows] = await pool.query(`
            SELECT
                r.id,
                r.reference_no,
                r.supplier,
                r.location_id,
                l.name AS location_name,
                r.status,
                r.created_by,
                r.created_at
            FROM receipts r
            JOIN locations l ON l.id = r.location_id
            ORDER BY r.id DESC
        `);

        return rows;
    },

    async getReceiptById(id) {
        const [receipts] = await pool.query(`
            SELECT
                r.id,
                r.reference_no,
                r.supplier,
                r.location_id,
                l.name AS location_name,
                r.status,
                r.created_by,
                r.created_at
            FROM receipts r
            JOIN locations l ON l.id = r.location_id
            WHERE r.id = ?
        `, [id]);

        if (receipts.length === 0) {
            return null;
        }

        const [items] = await pool.query(`
            SELECT
                ri.id,
                ri.product_id,
                p.name AS product_name,
                p.sku,
                ri.quantity
            FROM receipt_items ri
            JOIN products p ON p.id = ri.product_id
            WHERE ri.receipt_id = ?
        `, [id]);

        return {
            ...receipts[0],
            items
        };
    },

    async createReceipt({ reference_no, supplier, location_id, items, created_by }) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [result] = await connection.query(`
                INSERT INTO receipts
                    (reference_no, supplier, location_id, created_by)
                VALUES (?, ?, ?, ?)
            `, [
                reference_no,
                supplier || null,
                location_id,
                created_by || null
            ]);

            const receiptId = result.insertId;

            for (const item of items) {
                await connection.query(`
                    INSERT INTO receipt_items
                        (receipt_id, product_id, quantity)
                    VALUES (?, ?, ?)
                `, [
                    receiptId,
                    item.product_id,
                    item.quantity
                ]);
            }

            await connection.commit();

            return this.getReceiptById(receiptId);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async validateReceipt(id, userId) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [receipts] = await connection.query(`
                SELECT *
                FROM receipts
                WHERE id = ?
                FOR UPDATE
            `, [id]);

            if (receipts.length === 0) {
                throw new Error("Receipt not found");
            }

            const receipt = receipts[0];

            if (receipt.status !== "draft") {
                throw new Error("Receipt has already been processed");
            }

            const [items] = await connection.query(`
                SELECT *
                FROM receipt_items
                WHERE receipt_id = ?
            `, [id]);

            if (items.length === 0) {
                throw new Error("Receipt has no items");
            }

            for (const item of items) {
                await StockService.increaseStock(
                    item.product_id,
                    receipt.location_id,
                    Number(item.quantity),
                    connection
                );

                await LedgerService.createEntry({
                    productId: item.product_id,
                    locationId: receipt.location_id,
                    movementType: "receipt",
                    quantityChange: Number(item.quantity),
                    referenceType: "receipt",
                    referenceId: receipt.id,
                    note: `Receipt ${receipt.reference_no}`,
                    createdBy: userId || receipt.created_by,
                    connection
                });
            }

            await connection.query(`
                UPDATE receipts
                SET status = 'validated'
                WHERE id = ?
            `, [id]);

            await connection.commit();

            return this.getReceiptById(id);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = ReceiptService;
