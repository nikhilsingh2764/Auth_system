import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import userRepository from "../repository/user.repository.js";
import otpRepository from "../repository/otp.repository.js";

const SALT_ROUNDS = 10;


const ResetPasswordService = async ({ email, otp, newPassword }) => {


    // Validate input
    if (!email || !otp || !newPassword) {
        throw new ApiError(
            400,
            "Email, OTP and new password are required"
        );
    }

    // Sanitize email
    email = email.trim().toLowerCase();

    // Find user
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(404, "User not found");
    }


    //find Otp
    const otpdata = await otpRepository.findByEmailAndType(email, "PASSWORD_RESET")
   
    console.log(otpdata);
    console.log("DB OTP:", otpdata.otp);
    console.log("Request OTP:", otp);
    console.log("Equal?", otpdata.otp === otp);


    if (!otpdata) {
        throw new ApiError(400, "Invalid OTP");
    }

    // Check expiry
    if (otpdata.expiresAt < new Date()) {
        await otpRepository.deleteById(otpdata._id);
        throw new ApiError(400, "OTP has expired");
    }

    //OPT verify
    if (otpdata.otp !== otp) {
        throw new ApiError(400, "Invalid  OTP");
    }


    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);



    //update password
    await userRepository.updateProfile(
        user._id,
        {
            password: hashedNewPassword
        }
    );

    // Delete OTP after successful reset
    await otpRepository.deleteById(otpdata._id);

    return null;

}

export default ResetPasswordService;