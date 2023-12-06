const User = require('../model/user')
const passport = require('passport')
const passportGoogle = require('passport-google-oauth20');
const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Deserialize the user using their ID
  } catch (err) {
    done(err, null);
  }
});

passport.use('google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:8080/auth/google/redirect",
      scope: ['email', 'profile'],
    },
    async (accessToken, refreshToken , profile, done) => {
      try{
        const newUser = await User.findOne({ googleId: profile.id }).exec();

        // If user doesn't exist creates a new user. (similar to sign up)
        if(newUser) {

          newUser.refreshToken = refreshToken;
          await newUser.save();
          return done(null, newUser);
        } else {
          const emailDuplicate = await User.findOne({ email: profile.emails && profile.emails[0] ? profile.emails[0].value : '' }).exec();

          if(emailDuplicate) {
            emailDuplicate.googleId = profile.id;
            emailDuplicate.refreshToken = refreshToken;
            await emailDuplicate.save();
            res.json(accessToken)
            return done(null, profile);
          } else {
            const newUserCred = new User({
              email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
              googleId: profile.id,
              roles: { "User": 2001 },
              refreshToken: refreshToken,
              profileImage: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
            });
            res.json(accessToken)
            await newUserCred.save()
            return done(null, profile);
          }
        }
      } catch (error) {
        console.error(error); // Log the error
        return done(new Error('Internal Server Error')); // Return an error response
     }
    }
  )
);

