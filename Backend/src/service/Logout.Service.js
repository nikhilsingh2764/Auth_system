import refreshTokenRepository from "../repository/refreshToken.repository.js";


const LogoutService = async (refreshToken) => {


    // Remove refresh token from database
    if (refreshToken) {

        await refreshTokenRepository.deleteByToken(
            refreshToken
        );

    }


    return null;

};


export default LogoutService;
