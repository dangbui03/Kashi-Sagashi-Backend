const express = require("express");
const router = express.Router();
const OTPController = require('../controllers/OTPController/OTPController')

router.post("/", OTPController.OTPController);

module.exports = router;