const OTP = require('../../model/OTP');
const bcrypt = require('bcrypt');
const sendEmail = require('../../utils/sendEmail')

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if(!(email && subject && message)) {
            throw Error ("Provide values for email, subject, message");
        }

        // clear any old record
        const delOTP = await OTP.deleteOne({ email });
        console.log(delOTP);

        // generate pin
        const generatedOTP = `${Math.floor(1000 + Math.random() * 9000)}`;

        //send mail
        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject,
            html: `<p>${message}</p> <p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }
        const send = await sendEmail(mailOptions);
        console.log(send);

        //save OTP record
        const hashedOTP = await bcrypt.hash(generatedOTP, 10);
        const newOTP = new OTP({
            email: email,
            OTP: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000 * +duration,
        });

        const result = await newOTP.save();
        return result;

    } catch (error) {
        throw error;
    }
}

const sendOTPController = async(req, res) => {
    try {
        const { email, subject, message, duration } = req.body;
        console.log(email, subject)
        const createOTP = await sendOTP({
            email, 
            subject,
            message,
            duration,
        });
        res.status(200).json(createOTP);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    sendOTPController,
    sendOTP
}