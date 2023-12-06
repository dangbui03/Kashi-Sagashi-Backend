const express = require("express");
const router = express.Router();

const loginController = require('../../controllers/AuthController/loginController');
const logoutController = require('../../controllers/AuthController/logoutController');
const refreshTokenController = require('../../controllers/AuthController/refreshTokenController');
const registerController = require('../../controllers/AuthController/registerController');

router.post('/register', registerController.handleNewUser);
router.post('/login', loginController.handleLogin);
router.get('/refresh', refreshTokenController.handleRefreshToken);
router.get('/logout', logoutController.handleLogout);

module.exports = router;