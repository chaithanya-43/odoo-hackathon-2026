const pool = require("../config/db");

const LedgerService = {
    async createEntry({
        productId,
        locationId,
        movementType,
        quantityChange,
        referenceType,
        referenceId,
        note,
        createdBy,
        connection = pool
    }) {
        const [result] = await connection.query(
            `
            INSERT INTO stock_ledger
            (
                product_id,
                location_id,
                movement_type,
                quantity_change,
                reference_type,
                reference_id,
                note,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                productId,
                locationId,
                movementType,
                quantityChange,
                referenceType || null,
                referenceId || null,
                note || null,
                createdBy || null
            ]
        );

        return {
            id: result.insertId,
            product_id: productId,
            location_id: locationId,
            movement_type: movementType,
            quantity_change: quantityChange,
            reference_type: referenceType || null,
            reference_id: referenceId || null
        };
    }
};

module.exports = LedgerService;
