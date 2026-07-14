import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import userRepository from "../repository/user.repository.js";


const DeactivateAccountService = async (id) => {

    //check user exist
    const user =await userRepository.findById(id);

    if (!user) {
        throw new ApiError(404, "User not exist")
    }

    console.log("accoynt is",user.isActive);

    //check already de-activate
    if (!user.isActive) {
        throw new ApiError(400, "Account is already deactivated");
    }

    //De-Activate account
    await userRepository.deactivateAccount(id);

    return null;

}

export default DeactivateAccountService;