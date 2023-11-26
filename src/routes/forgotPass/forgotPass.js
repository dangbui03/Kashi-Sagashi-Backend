const express = require('express');
const router = express.Router();

const forgotPasswordController = require('../../controllers/forgotPasswordController/forgotPassController')

router.post('/', forgotPasswordController.forgotPasswordController);

module.exports = router;