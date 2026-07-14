import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import userRepository from "../repository/user.repository.js";
import sendEmail from "./email.service.js";
import sendOTPService from "./otp.service.js";
import generateToken from "../utils/generateToken.js";


const LoginService = async (userdata) => {

    let { email, password } = userdata;

    //sanitize data
    email = email.trim().toLowerCase();

    //find user exist
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }

    //check email verifcation
    if (!user.isVerified) {
        throw new ApiError(400, "Please verify your email");
    }

    if (!user.isActive) {
        throw new ApiError(400, "Account is deactivated");
    }

    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);


    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid password");
    }


    //generate access token
    const accessToken = generateToken(
        {
            id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRES_IN
    );


    // Generate Refresh Token
    const refreshToken = generateToken(
        {
            id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRES_IN
    );

    console.log("accessToken is :",accessToken);
    console.log("refreshToken is :",refreshToken);



    //return data+token
    return {
        user: {
            email: user.email,
            username: user.username,
            id: user._id
        },
        accessToken,
        refreshToken


    }


};

export default LoginService