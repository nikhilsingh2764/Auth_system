import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,   // Required to create user after OTP verification
        trim: true         // Removes extra spaces
    },

    email: {
        type: String,
        required: true,    // Used to identify the OTP record
        lowercase: true,   // Prevents duplicate emails with different cases
        trim: true         // Removes extra spaces
    },

    password: {
        type: String,
        required: true     // Stores hashed password until OTP is verified
    },

    otp: {
        type: String,
        required: true     // Stores verification OTP
    },

    expiresAt: {
        type: Date,
        required: true     // OTP becomes invalid after this time
    }

}, {
    timestamps: true       // Automatically adds createdAt & updatedAt
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;