const express = require('express');
const router = express.Router();
const path = require('path');
const verifyJWT = require('../middleware/verifyJWT');

// Router require
const normalAuth = require('./auth/authNormal')
const googleAuthRoute = require('./auth/authGoogle')
const findSong = require('./api/song.route')

// Router use
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.use('/auth', [normalAuth, googleAuthRoute]);
router.use('/otp', require('./verifyEmail/OTP'))
router.use('/verifyemail', require('./verifyEmail/emailVerification'))
router.use('/forgotpass', require('./forgotPass/forgotPass'))

router.use(verifyJWT);
router.use('/song', [findSong]);

module.exports = router;