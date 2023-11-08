const express = require("express");
const router = express.Router();
const passport = require('passport')

const authController = require('../controllers/authController');

router.post("/", authController.handleLogin);


module.exports = router;