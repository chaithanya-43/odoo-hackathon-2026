const express=require("express");
const c=require("../controllers/dashboardController");
const r=express.Router();
r.get("/",c.getDashboard);
module.exports=r;
