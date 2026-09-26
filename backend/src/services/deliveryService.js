const pool = require("../config/db");
const StockService = require("./stockService");
const LedgerService = require("./ledgerService");

const DeliveryService = {
    async getAllDeliveries() {
        const [rows] = await pool.query(`
            SELECT
                d.id,
                d.reference_no,
                d.customer,
                d.location_id,
                l.name AS location_name,
                d.status,
                d.created_by,
                d.created_at
            FROM deliveries d
            JOIN locations l ON l.id = d.location_id
            ORDER BY d.id DESC
        `);

        return rows;
    },

    async getDeliveryById(id) {
        const [deliveries] = await pool.query(`
            SELECT
                d.id,
                d.reference_no,
                d.customer,
                d.location_id,
                l.name AS location_name,
                d.status,
                d.created_by,
                d.created_at
            FROM deliveries d
            JOIN locations l ON l.id = d.location_id
            WHERE d.id = ?
        `, [id]);

        if (deliveries.length === 0) {
            return null;
        }

        const [items] = await pool.query(`
            SELECT
                di.id,
                di.product_id,
                p.name AS product_name,
                p.sku,
                di.quantity
            FROM delivery_items di
            JOIN products p ON p.id = di.product_id
            WHERE di.delivery_id = ?
        `, [id]);

        return {
            ...deliveries[0],
            items
        };
    },

    async createDelivery({
        reference_no,
        customer,
        location_id,
        items,
        created_by
    }) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [result] = await connection.query(`
                INSERT INTO deliveries
                    (reference_no, customer, location_id, created_by)
                VALUES (?, ?, ?, ?)
            `, [
                reference_no,
                customer || null,
                location_id,
                created_by || null
            ]);

            const deliveryId = result.insertId;

            for (const item of items) {
                await connection.query(`
                    INSERT INTO delivery_items
                        (delivery_id, product_id, quantity)
                    VALUES (?, ?, ?)
                `, [
                    deliveryId,
                    item.product_id,
                    item.quantity
                ]);
            }

            await connection.commit();

            return this.getDeliveryById(deliveryId);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    async validateDelivery(id, userId) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const [deliveries] = await connection.query(`
                SELECT *
                FROM deliveries
                WHERE id = ?
                FOR UPDATE
            `, [id]);

            if (deliveries.length === 0) {
                throw new Error("Delivery not found");
            }

            const delivery = deliveries[0];

            if (delivery.status !== "draft") {
                throw new Error("Delivery has already been processed");
            }

            const [items] = await connection.query(`
                SELECT *
                FROM delivery_items
                WHERE delivery_id = ?
            `, [id]);

            if (items.length === 0) {
                throw new Error("Delivery has no items");
            }

            for (const item of items) {
                await StockService.decreaseStock(
                    item.product_id,
                    delivery.location_id,
                    Number(item.quantity),
                    connection
                );

                await LedgerService.createEntry({
                    productId: item.product_id,
                    locationId: delivery.location_id,
                    movementType: "delivery",
                    quantityChange: -Number(item.quantity),
                    referenceType: "delivery",
                    referenceId: delivery.id,
                    note: `Delivery ${delivery.reference_no}`,
                    createdBy: userId || delivery.created_by,
                    connection
                });
            }

            await connection.query(`
                UPDATE deliveries
                SET status = 'validated'
                WHERE id = ?
            `, [id]);

            await connection.commit();

            return this.getDeliveryById(id);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = DeliveryService;