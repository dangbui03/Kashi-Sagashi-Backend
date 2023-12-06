const User = require('../../model/user')
const sendOTPController = require("../OTPController/sendOTPController")

const sendPasswordResetOTPEmail = async ({email}) => {
    try {
        // check if account exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            throw Error ("There's no account for the provided email.");
        } 

        if (!existingUser.verified) {
            throw Error ("Email hasn't been verified yet. Check your inbox.")
        }

        const otpDetails = {
            email: email,
            subject: "Password Reset",
            message: "Enter the code below to reset your password.",
            duration: 1,
        };

        const createdOTP = await sendOTPController.sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

const forgotPasswordController = async (req, res) => {
    
    try {
        const { email } = req.body;
        if(!email) return res.status(403).json({ message: "An email is required "});

        const createdPasswordResetOTP = await sendPasswordResetOTPEmail({
            email
        })
        res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { forgotPasswordController, sendPasswordResetOTPEmail }