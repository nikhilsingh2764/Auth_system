import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import UserRepository from "../repository/user.repository.js";
import sendEmail from "./email.service.js";
import sendOTPService from "./otp.service.js";

const SALT_ROUNDS = 10;

const SignupService = async (userdata) => {

    let { username, email, password } = userdata;


    //sanitize data
    username = username.trim();
    email = email.trim().toLowerCase();



    // Business Logic

    const emailExist = await UserRepository.emailExist(email);

    if (emailExist) {
        throw new ApiError(409, "Email already exists");
    }

    const usernameExist = await UserRepository.usernameExist(email);

    if (usernameExist) {
        throw new ApiError(409, "Username already exists");
    }

    //generate OPT and save opt with temporary signup data in db and send opt to client email
    await sendOTPService({ username, email, password, type: "EMAIL_VERIFICATION" })


    //return response to controller
    return {
        email
    }

}




export default SignupService;