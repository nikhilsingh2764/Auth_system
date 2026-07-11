class ApiError extends Error{   //ApiError inherits all the properties and methods of JavaScript's built-in Error class.

    constructor(statuscode,message='something went wrong',errors=[],){
     super(message) //Call the parent class (Error) constructor and pass the message to it.
     this.success=false;
     this.statuscode=statuscode;
     this.message=message;
     this.errors=errors;
     
     Error.captureStackTrace(this, this.constructor);  //saves a clean stack trace (where the error happened) in the current error object.

    }

}

export default ApiError;