import ApiError from "../utils/ApiError.js";
import userRepository from "../repository/user.repository.js";


const UpdateProfileService = async (id, data) => {

    const { username } = data;


    // Check username exists
    if (username) {

        const existingUser = await userRepository.findByUsername(username);


        // If username belongs to another user
        if (
            existingUser &&
            existingUser._id.toString() !== id.toString()
        ) {
            throw new ApiError(400, "Username already exists");
        }
    }


    // Update profile
    const updatedUser = await userRepository.updateProfile(
        id,
        {
            username
        }
    );


    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }


    // Return safe user data
    return {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
    };

};


export default UpdateProfileService;

