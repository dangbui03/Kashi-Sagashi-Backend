const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        OTP: {
            type: String
        },
        createdAt: Date,
        expiredAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("OTP", OTPSchema);