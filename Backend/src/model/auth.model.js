import mongoose from "mongoose";


const authSchema = new mongoose.Schema({

    Username: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true,
    },

}, { timestamps: true })




const User= mongoose.model('User',authSchema);

export default User;






