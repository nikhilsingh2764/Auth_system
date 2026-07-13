import TryCatch from "../middleware/TryCatch.js";
import ApiResponse from "../utils/ApiResponse.js";
import SignupService from "../service/user.service.js";
import VerifyOTPService from "../service/verifyOtp.service.js";



export const Signup = TryCatch(async (req, res) => {

    const data = await SignupService(req.body);

    return res.status(201)
        .json(
            new ApiResponse(
                201,
                'OTP sent successfully',
                data
            )
        );

})


export const VerifyOTP = TryCatch(async (req, res) => {

    const data = await VerifyOTPService(req.body);

    return res.status(201)
        .json(
            new ApiResponse(
                201,
                'Account created successfully',
                data
            )
        );

})






