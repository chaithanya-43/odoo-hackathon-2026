const DeliveryService = require("../services/deliveryService");

const deliveryController = {
    getDeliveries: async (req, res, next) => {
        try {
            const deliveries = await DeliveryService.getAllDeliveries();

            res.json({
                success: true,
                message: "Deliveries retrieved successfully",
                data: deliveries
            });
        } catch (error) {
            next(error);
        }
    },

    getDelivery: async (req, res, next) => {
        try {
            const delivery = await DeliveryService.getDeliveryById(
                req.params.id
            );

            if (!delivery) {
                return res.status(404).json({
                    success: false,
                    message: "Delivery not found"
                });
            }

            res.json({
                success: true,
                message: "Delivery retrieved successfully",
                data: delivery
            });
        } catch (error) {
            next(error);
        }
    },

    createDelivery: async (req, res, next) => {
        try {
            const {
                reference_no,
                customer,
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

            const delivery = await DeliveryService.createDelivery({
                reference_no,
                customer,
                location_id,
                items,
                created_by: req.user?.id || null
            });

            res.status(201).json({
                success: true,
                message: "Delivery created successfully",
                data: delivery
            });
        } catch (error) {
            next(error);
        }
    },

    validateDelivery: async (req, res, next) => {
        try {
            const delivery = await DeliveryService.validateDelivery(
                req.params.id,
                req.user?.id || null
            );

            res.json({
                success: true,
                message: "Delivery validated successfully",
                data: delivery
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = deliveryController;