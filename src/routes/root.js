const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

// Router require
const normalAuth = require('./auth/authNormal')
const googleAuthRoute = require('./auth/authGoogle')
const findSong = require('./song/song.route')

// Router use
router.use('/auth', [normalAuth, googleAuthRoute]); 
router.use('/otp', require('./verifyEmail/OTP'))
router.use('/verifyemail', require('./verifyEmail/emailVerification'))
router.use('/forgotpass', require('./forgotPass/forgotPass'))

router.use(verifyJWT);
router.use('/song', [findSong]);

module.exports = router;