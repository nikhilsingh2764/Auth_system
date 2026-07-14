import TryCatch from "../middleware/TryCatch.js";
import ApiResponse from "../utils/ApiResponse.js";
import RefreshTokenService from "../service/refreshToken.service.js";
import { accessTokenOptions } from "../utils/cookieOptions.js";

export const RefreshToken = TryCatch(async (req, res) => {

    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    // Generate new access token
    const accessToken = await RefreshTokenService(refreshToken);

    // store new access token in cookie
    res.cookie(
        "accessToken",
        accessToken,
        accessTokenOptions
    )


    // Send success response
    return res.status(200).json(
        new ApiResponse(200, "Access token refreshed successfully")
    )





});