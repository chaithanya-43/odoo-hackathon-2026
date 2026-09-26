const express = require("express");
const deliveryRoutes = require("./routes/deliveryRoutes");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const receiptRoutes = require("./routes/receiptRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "StockSense backend is running"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`StockSense backend running on port ${PORT}`);
});
