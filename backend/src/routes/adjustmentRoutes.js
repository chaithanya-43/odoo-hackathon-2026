const express=require("express");
const c=require("../controllers/adjustmentController");
const r=express.Router();
r.get("/",c.getAdjustments);r.post("/",c.createAdjustment);r.get("/:id",c.getAdjustment);r.post("/:id/validate",c.validateAdjustment);
module.exports=r;
