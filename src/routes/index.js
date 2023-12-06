const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

// Router require
const normalAuth = require('./auth/authNormal.route')
const googleAuth = require('./auth/authGoogle.route')
const song = require('./song/song.route')
const user = require('./user/user.route')

// Router use
router.use('/auth', [normalAuth, googleAuth]); 
router.use('/otp', require('./verifyEmail/OTP.route'))
router.use('/verifyemail', require('./verifyEmail/emailVerification.route'))
router.use('/forgotpass', require('./forgotPass/forgotPass.route'))
router.use('/song', require('./song/findsong.route'))

router.use(verifyJWT);
router.use('/user', [user]);
router.use('/song', [song]);

module.exports = router;