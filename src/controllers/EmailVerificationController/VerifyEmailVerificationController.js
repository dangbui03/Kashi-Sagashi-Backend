const User = require('../../model/user');
const verifyOTPController  = require('../OTPController/verifyOTPController')
const deleteOTPController = require('../OTPController/deleteOTP')

const verifyUserEmail = async ({ email, otp }) => {
    try {
        const validOTP = await verifyOTPController.verifyOTP({ email, otp });
        if (!validOTP) throw Error ("Invalid code passed. Check your inbox.");

        // Update user to show verified
        await User.updateOne({ email }, {verified: true});

        await deleteOTPController.deleteOTP({ email });
        return;
    } catch (error) {
        throw error;
    }
}

const verifyOTPEmailVerificationController = async(req, res) => {
    try {
        const { email, otp } = req.body;
        if (!(email && otp)) return res.status(404).json({ message: "Empty otp details are not allowed"});

        await verifyUserEmail({ email, otp });
        res.status(200).json({ email, verified: true })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { verifyOTPEmailVerificationController, verifyUserEmail }