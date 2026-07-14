import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import userRepository from "../repository/user.repository.js";
import generateToken from "../utils/generateToken.js";


const RefreshTokenService = async (refreshToken) => {

    // Check refresh token exists
    if (!refreshToken) {
        throw new ApiError(401, "Refresh token is missing");
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    //find user

    const user = await userRepository.findById(decoded.id);

    //check user exist

    if (!user) {
        throw new ApiError(401, "user not found");
    }

    //check user is active
    if (!user.isActive) {
        throw new ApiError(403, "Account is deactivated");
    }


    //Generate  new acess token
    const accessToken = generateToken(
        {
            id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRES_IN
    );


    return accessToken;


}

export default RefreshTokenService;