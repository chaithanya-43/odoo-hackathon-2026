const ReceiptService = require("../services/receiptService");

const receiptController = {
    getReceipts: async (req, res, next) => {
        try {
            const receipts = await ReceiptService.getAllReceipts();

            res.json({
                success: true,
                message: "Receipts retrieved successfully",
                data: receipts
            });
        } catch (error) {
            next(error);
        }
    },

    getReceipt: async (req, res, next) => {
        try {
            const receipt = await ReceiptService.getReceiptById(
                req.params.id
            );

            if (!receipt) {
                return res.status(404).json({
                    success: false,
                    message: "Receipt not found"
                });
            }

            res.json({
                success: true,
                message: "Receipt retrieved successfully",
                data: receipt
            });
        } catch (error) {
            next(error);
        }
    },

    createReceipt: async (req, res, next) => {
        try {
            const {
                reference_no,
                supplier,
                location_id,
                items
            } = req.body;

            if (
                !reference_no ||
                !location_id ||
                !Array.isArray(items) ||
                items.length === 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Reference number, location and items are required"
                });
            }

            const receipt = await ReceiptService.createReceipt({
                reference_no,
                supplier,
                location_id,
                items,
                created_by: req.user?.id || null
            });

            res.status(201).json({
                success: true,
                message: "Receipt created successfully",
                data: receipt
            });
        } catch (error) {
            next(error);
        }
    },

    validateReceipt: async (req, res, next) => {
        try {
            const receipt = await ReceiptService.validateReceipt(
                req.params.id,
                req.user?.id || null
            );

            res.json({
                success: true,
                message: "Receipt validated successfully",
                data: receipt
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = receiptController;