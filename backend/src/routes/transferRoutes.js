const express=require("express");
const c=require("../controllers/transferController");
const r=express.Router();
r.get("/",c.getTransfers);r.post("/",c.createTransfer);r.get("/:id",c.getTransfer);r.post("/:id/validate",c.validateTransfer);
module.exports=r;
