const errorMiddleware = (err,req,res,next) => {

   const statuscode= err.statuscode || 500;

   res.status(statuscode).json({
     success: false,
     statuscode: statuscode,
     message: err.message || 'something went wrong',
     errors: err.errors || []

   });




};


export default errorMiddleware;
















//"Why do we create error middleware for ApiError class, 
// but we don't create res middleware for ApiResponse? class"
//reason is: errors need a central place to be caught
//responses are already controlled by the controller.
