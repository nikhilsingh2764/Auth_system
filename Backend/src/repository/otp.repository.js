import OTP from "../model/opt.model.js";


class OTPRepository {

    //save OTP and signup data in DB
    async create(data) {
        return await OTP.create(data);
    }

    // Find OTP using email during verification
    async findByEmail(email) {
        return await OTP.findOne({email});
    }

    // Remove all old OTP before generating a new one
    async deleteByEmail(email) {
        return await OTP.deleteMany({ email });
    }

    async deleteById(id) {
        return await OTP.findByIdAndDelete(id);

    }


}

export default new OTPRepository();