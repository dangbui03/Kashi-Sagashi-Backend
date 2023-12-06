const express = require("express");
const router = express.Router();

const EmailVerificationController = require('../../controllers/EmailVerificationController/SendEmailVerificationController')
const verifyOTPEmailVerificationController = require('../../controllers/EmailVerificationController/VerifyEmailVerificationController')

router.post('/sendemail', EmailVerificationController.sendOTPEmailVerificationController);
router.post('/verifyemail', verifyOTPEmailVerificationController.verifyOTPEmailVerificationController);

module.exports = router;