import ApiError from "../utils/ApiError.js";
import otpRepository from "../repository/otp.repository.js";
import userRepository from "../repository/user.repository.js";
import sendEmail from "./email.service.js";
import welcomeTemplate from "../templates/welcome.template.js";


const VerifyOTPService = async ({ email, otp }) => {



    //find old record
    const otpData = await otpRepository.findByEmail(email);

    if (!otpData) {
        throw new ApiError(400, 'Invalid OTP');
    }

    //check opt expiry
    if (otpData.expiresAt < new Date()) {

        await otpRepository.deleteById(_id);
        throw new ApiError(400, "OTP has expired");

    }

    //verify otp
    if (otpData.otp !== otp) {
        throw new ApiError(400, 'Invalid OTP');
    }

    // create user
    const user = await userRepository.create({
        email: otpData.email,
        username: otpData.username,
        password: otpData.password
    })


    //remove all opt record form db after successful verification
    await otpRepository.deleteById(otpData._id);

    //send welcome email
    await sendEmail({
        to: user.email,
        subject: "successful verification",
        html: welcomeTemplate(user.username)
    });



};



export default VerifyOTPService;









