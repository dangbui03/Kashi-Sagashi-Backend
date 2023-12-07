const OTP = require('../../model/OTP');
const bcrypt = require('bcrypt');

const verifyOTP = async ({email, otp}) => {
    try {
        if(!(email, otp)) {
            throw Error ("Provide values for email, otp");
        }

        // secure otp record exists
        const matchOTP = await OTP.findOne({ email });
        if (!matchOTP) throw Error("No otp records found");

        const { expiredAT } = matchOTP;
        if (expiredAT < Date.now()) {
            await OTP.deleteOne({ email });
            throw Error ("Code has expired. Request for a new one");
        }

        //not expired yet, verify value
        const hashedOTP = matchOTP.OTP;
        const validOTP = await bcrypt.compare(otp, hashedOTP);
        return validOTP;

    } catch (error) {
        throw error;
    }
}

const verifyOTPController = async (req, res) => {
    try {
        let {email, otp} = req.body;
        const validOTP = await verifyOTP({ email, otp });
        res.status(200).json({ valid: validOTP });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { verifyOTPController, verifyOTP };