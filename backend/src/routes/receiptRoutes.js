const express = require("express");
const receiptController = require("../controllers/receiptController");

const router = express.Router();

router.get("/", receiptController.getReceipts);
router.post("/", receiptController.createReceipt);
router.get("/:id", receiptController.getReceipt);
router.post("/:id/validate", receiptController.validateReceipt);

module.exports = router;