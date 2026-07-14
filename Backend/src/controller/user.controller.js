import TryCatch from "../middleware/TryCatch.js";
import ApiResponse from "../utils/ApiResponse.js";
import SignupService from "../service/user.service.js";
import VerifyOTPService from "../service/verifyOtp.service.js";
import LoginService from "../service/login.service.js"
import { accessTokenOptions, refreshTokenOptions } from "../utils/cookieOptions.js";
import ProfileService from "../service/profile.service.js";
import updateProfileService from "../service/UpdateProfile.service.js";
import updatePasswordService from "../service/ChangePassword.Service.js";



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

});



export const Login = TryCatch(async (req, res) => {

    const { user, accessToken, refreshToken } = await LoginService(req.body);

    //store tokens in res cookie

    res.cookie("accessToken", accessToken, accessTokenOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);


    return res.status(200).json(
        new ApiResponse(200, "Login Successful", user)
    );

});



export const Profile = TryCatch(async (req, res) => {

    //get userId from auth middleware
    const userId = req.user._id;


    //send userId to ProfileService
    const user = await ProfileService(userId);

    //send success response
    res.status(200).json(
        new ApiResponse(200, "Profile fetched successfully", user)
    );

});



export const Logout = TryCatch(async (req, res) => {

    //clear access and refresh token from cookies
    res.clearCookie("accessToken", accessTokenOptions);
    res.clearCookie("refreshToken", refreshTokenOptions);


    return res.status(200).json(
        new ApiResponse(200, "Logout successful")
    );


});



export const UpdateProfile = TryCatch(async (req, res) => {

    const userId = req.user._id;

    const user = await updateProfileService(userId, req.body)

    return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", user)
    );


});


export const UpdatePassword = TryCatch(async (req, res) =>{

});


