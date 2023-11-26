const OTP = require('../../model/OTP')

const deleteOTP = async ({ email }) => {
    try {
        await OTP.deleteOne({ email });
    } catch (error) {
        throw error;
    }
}

module.exports = deleteOTP;