const express=require("express");
const c=require("../controllers/ledgerController");
const r=express.Router();
r.get("/",c.getLedger);
module.exports=r;
