const User = require ('../../model/user')
const sendOTPController = require("../OTPController/sendOTPController")

const sendVerificationOTPEmail = async ({email}) => {
    try {   
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            throw Error ("There's no account for the provided email.");
        }

        const otpDetails = {
            email: email,
            subject: "Email Verification",
            message: "Verify your email with the code below",
            duration: 1,
        };
        
        const createdOTP = await sendOTPController.sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {   
        throw error;
    }
}   

const sendOTPEmailVerificationController = async(req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(403).json({ message: "An email is required "});
        
        const createdEmailVerificationOTP = await sendVerificationOTPEmail({
            email,
        });
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { sendOTPEmailVerificationController }