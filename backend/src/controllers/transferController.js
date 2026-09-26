const TransferService=require("../services/transferService");
const transferController={
 async getTransfers(req,res,next){try{res.json({success:true,message:"Transfers retrieved successfully",data:await TransferService.getAllTransfers()})}catch(e){next(e)}},
 async getTransfer(req,res,next){try{const d=await TransferService.getTransferById(req.params.id);if(!d)return res.status(404).json({success:false,message:"Transfer not found"});res.json({success:true,message:"Transfer retrieved successfully",data:d})}catch(e){next(e)}},
 async createTransfer(req,res,next){try{const {reference_no,source_location_id,destination_location_id,items}=req.body;if(!reference_no||!source_location_id||!destination_location_id||!Array.isArray(items)||!items.length)return res.status(400).json({success:false,message:"Reference, source, destination and items are required"});const d=await TransferService.createTransfer({...req.body,created_by:req.user?.id||null});res.status(201).json({success:true,message:"Transfer created successfully",data:d})}catch(e){next(e)}},
 async validateTransfer(req,res,next){try{const d=await TransferService.validateTransfer(req.params.id,req.user?.id||null);res.json({success:true,message:"Transfer validated successfully",data:d})}catch(e){next(e)}}
};
module.exports=transferController;
