const AdjustmentService=require("../services/adjustmentService");
const adjustmentController={
 async getAdjustments(req,res,next){try{res.json({success:true,message:"Adjustments retrieved successfully",data:await AdjustmentService.getAllAdjustments()})}catch(e){next(e)}},
 async getAdjustment(req,res,next){try{const d=await AdjustmentService.getAdjustmentById(req.params.id);if(!d)return res.status(404).json({success:false,message:"Adjustment not found"});res.json({success:true,message:"Adjustment retrieved successfully",data:d})}catch(e){next(e)}},
 async createAdjustment(req,res,next){try{const {reference_no,location_id,items}=req.body;if(!reference_no||!location_id||!Array.isArray(items)||!items.length)return res.status(400).json({success:false,message:"Reference, location and items are required"});const d=await AdjustmentService.createAdjustment({...req.body,created_by:req.user?.id||null});res.status(201).json({success:true,message:"Adjustment created successfully",data:d})}catch(e){next(e)}},
 async validateAdjustment(req,res,next){try{const d=await AdjustmentService.validateAdjustment(req.params.id,req.user?.id||null);res.json({success:true,message:"Adjustment validated successfully",data:d})}catch(e){next(e)}}
};
module.exports=adjustmentController;
