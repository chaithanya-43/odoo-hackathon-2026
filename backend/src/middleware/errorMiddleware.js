module.exports=(err,req,res,next)=>{
 console.error(err); console.log("REAL_ERROR:", err.message, err.code, err.sqlMessage);
 res.status(err.status||500).json({success:false,message:err.message||"Internal server error"});
};

