const ProductService = require("../services/productService");

const productController = {
    getProducts: async (req, res, next) => {
        try {
            const products = await ProductService.getAllProducts();

            res.json({
                success: true,
                message: "Products retrieved successfully",
                data: products
            });
        } catch (error) {
            next(error);
        }
    },

    getProduct: async (req, res, next) => {
        try {
            const product = await ProductService.getProductById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.json({
                success: true,
                message: "Product retrieved successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const {
                name,
                sku,
                category_id,
                uom,
                reorder_level
            } = req.body;

            if (!name || !sku) {
                return res.status(400).json({
                    success: false,
                    message: "Name and SKU are required"
                });
            }

            const product = await ProductService.createProduct({
                name,
                sku,
                category_id,
                uom,
                reorder_level
            });

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const product = await ProductService.updateProduct(
                req.params.id,
                req.body
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            res.json({
                success: true,
                message: "Product updated successfully",
                data: product
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = productController;