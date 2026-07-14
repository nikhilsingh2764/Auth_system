import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import userRepository from "../repository/user.repository.js";


const DeleteAccountService = async (id, password) => {

    // Check password is provided
    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    //find user exist
    const user = await userRepository.findByIdWithPassword(id);

    if (!user) {
        throw new ApiError(400, "user not found")
    }


    // Verify password 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);


    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password");
    }


    //delete account
    await userRepository.findByIdAndDelete(id);

    //return null;


};

export default DeleteAccountService;