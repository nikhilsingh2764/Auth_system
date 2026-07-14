import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import userRepository from "../repository/user.repository.js";
import generateToken from "../utils/generateToken.js";


const LoginService = async (userdata) => {

    let { email, password } = userdata;


    // Sanitize email
    email = email.trim().toLowerCase();


    // Find user
    const user = await userRepository.findByEmail(email);


    if (!user) {

        throw new ApiError(
            400,
            "Invalid email or password"
        );

    }



    // Check email verification

    if (!user.isVerified) {

        throw new ApiError(
            400,
            "Please verify your email"
        );

    }



    // Check account active

    if (!user.isActive) {

        throw new ApiError(
            400,
            "Account is deactivated"
        );

    }



    // Check account lock

    if (
        user.lockUntil &&
        user.lockUntil > new Date()
    ) {

        throw new ApiError(
            403,
            "Account temporarily locked. Try again later"
        );

    }



    // Compare password

    const isPasswordMatch =
        await bcrypt.compare(
            password,
            user.password
        );



    // Wrong password

    if (!isPasswordMatch) {


        user.failedLoginAttempts += 1;



        // Lock account after 5 failed attempts

        if (user.failedLoginAttempts >= 5) {


            user.lockUntil =
                new Date(
                    Date.now() + 15 * 60 * 1000
                );


        }



        await userRepository.updateProfile(
            user._id,
            {
                failedLoginAttempts:
                    user.failedLoginAttempts,

                lockUntil:
                    user.lockUntil
            }
        );



        throw new ApiError(
            400,
            "Invalid email or password"
        );

    }




    // Successful login
    // Reset failed attempts


    if (
        user.failedLoginAttempts > 0 ||
        user.lockUntil
    ) {


        await userRepository.updateProfile(
            user._id,
            {
                failedLoginAttempts: 0,
                lockUntil: null
            }
        );

    }




    // Generate Access Token

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

console.log(accessToken)
console.log("refreshToken :",refreshToken)


    return {

        user: {

            email: user.email,

            username: user.username,

            id: user._id

        },


        accessToken,

        refreshToken

    };


};


export default LoginService;