class ApiResponse{

constructor(statuscode, message='success',data=null) {
    this.success=True;
    this.statuscode=statuscode;
    this.message=message;
    this.data=data;
}

}


export default ApiResponse;








