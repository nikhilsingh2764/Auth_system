import ApiError from "../utils/ApiError.js";
import userRepository from "../repository/user.repository.js";

const ProfileService = async (userId) => {

    //find user using ID
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new ApiError(404, "user not exist")
    }

    //return profile data
    return {

        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt

    }


};

export default ProfileService;