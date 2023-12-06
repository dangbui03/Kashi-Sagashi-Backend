const express = require("express");
const router = express.Router();
const passport = require('passport')

router.get('/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: 'select_account'
  })
);

router.get("/google/redirect", passport.authenticate("google"));

module.exports = router;