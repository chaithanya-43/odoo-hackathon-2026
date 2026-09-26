const LedgerService=require("../services/ledgerService");
const ledgerController={
 async getLedger(req,res,next){
  try{
   const data=await LedgerService.getEntries(req.query);
   res.json({success:true,message:"Ledger retrieved successfully",data});
  }catch(e){next(e)}
 }
};
module.exports=ledgerController;
