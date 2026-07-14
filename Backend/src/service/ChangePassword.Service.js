import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import userRepository from "../repository/user.repository.js";


const updatePasswordService = async (id, data) => {

    const { oldPassword, newPassword } = data;

    if (!newPassword || !oldPassword) {
        throw new ApiError(400, "Old password and new password are required");
    }

    //Find user with password
    const user = await userRepository.findByIdWithPassword(id)

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    //compare old password
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect");

    }

    //hash new password

    const newHashedPassword =await bcrypt.hash(newPassword, 10)

    //update password in DB
    await userRepository.updateProfile(id, { password: newHashedPassword })

    return null;

};

export default updatePasswordService;