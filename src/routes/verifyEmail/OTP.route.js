const express = require("express");
const router = express.Router();
const sendOTPController = require('../../controllers/OTPController/sendOTPController')
const verifyOTPController = require('../../controllers/OTPController/verifyOTPController')

router.post("/sendotp", sendOTPController.sendOTPController);
router.post("/verifyotp", verifyOTPController.verifyOTPController)

module.exports = router;