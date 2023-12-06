const User = require('../../model/user');
const verifyOTPController  = require('../OTPController/verifyOTPController')
const deleteOTPController = require('../OTPController/deleteOTP')
const bcrypt = require('bcrypt');

const resetUserPassword = async ({ email, otp, newPassword }) => {
    try {
        const validOTP = await verifyOTPController.verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error ("Invalid code passed. Check your inbox.");
        }

        // Update user record with new password.
        if (newPassword.length < 8) {
            throw Error ("Password less than 8 characters.");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, {password: hashedNewPassword});

        await deleteOTPController.deleteOTP({ email });
        return;
    } catch (error) {
        throw error;
    }
}

const resetPasswordController = async (req, res) => {
    try {
        let { email, otp, newPassword } = req.body;
        if(!(email && otp && newPassword)) return res.status(400).json({ message: "Empty credentials are not allowed."});

        await resetUserPassword({
            email,
            otp,
            newPassword,
        })
        res.status(200).json({ email, passwordreset: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { resetPasswordController, resetUserPassword };