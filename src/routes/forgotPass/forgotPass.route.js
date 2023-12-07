const express = require('express');
const router = express.Router();

const sendForgotPasswordController = require('../../controllers/forgotPasswordController/sendforgotPassOTPController')
const resetPasswordController = require('../../controllers/forgotPasswordController/resetPassController')

router.post('/sendotp', sendForgotPasswordController.forgotPasswordController);
router.put('/reset', resetPasswordController.resetPasswordController)

module.exports = router;