const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: process.env.HOST,
	service: process.env.SERVICE,
	port: Number(process.env.EMAIL_PORT),
	secure: Boolean(process.env.SECURE),
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
});

transporter.verify((error, success) => {
	if(error) {
		console.log(error);
	} else { 
		console.log("Ready for message");
		console.log(success);
	}
})

let sendEmail = async (mailOptions) => {
	try { 
		await transporter.sendMail(mailOptions);
		return;
	} catch (error) {
		throw error;
	}
};

module.exports = sendEmail;