const express = require("express");
const router = express.Router();

const EmailVerificationController = require('../../controllers/EmailVerificationController/EmailVerificationController')

router.post('/', EmailVerificationController.OTPVerificationEmailController);

module.exports = router;