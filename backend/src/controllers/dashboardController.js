const DashboardService=require("../services/dashboardService");
const dashboardController={
 async getDashboard(req,res,next){try{res.json({success:true,message:"Dashboard retrieved successfully",data:await DashboardService.getDashboard()})}catch(e){next(e)}}
};
module.exports=dashboardController;
