const express = require("express");
const deliveryController = require("../controllers/deliveryController");

const router = express.Router();

router.get("/", deliveryController.getDeliveries);
router.post("/", deliveryController.createDelivery);
router.get("/:id", deliveryController.getDelivery);
router.post("/:id/validate", deliveryController.validateDelivery);

module.exports = router;