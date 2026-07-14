import ApiError from "../utils/ApiError.js";
import userRepository from "../repository/user.repository.js";
import otpRepository from "../repository/otp.repository.js";
import sendOTPService from "./otp.service.js";

const ForgotPasswordService = async (email) => {

    // Sanitize email
    email = email.trim().toLowerCase();

    //check user exists
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    //remove old password reset history from db
    await otpRepository.deleteByEmailAndType(email, "PASSWORD_RESET");


    // Send new OTP
    await sendOTPService({  //is a service take data and send otp and save otp data in otp-db
        email: user.email,
        type: "PASSWORD_RESET"
    });

    return null;




}

export default ForgotPasswordService;