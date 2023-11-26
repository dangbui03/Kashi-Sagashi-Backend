//Express and Node server imports
require('dotenv').config();
const path = require('path')
const http = require('http');
const express = require("express");
const session = require('express-session')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const passport = require('passport');

require('./src/configs/passport')

const app = express();

//
const corsOptions = require('./src/configs/corsOptions')
const verifyJWT = require('./src/middleware/verifyJWT');
const errorHandler = require('./src/middleware/errorHandler');
const { logger } = require('./src/middleware/logEvents');
const credentials = require('./src/middleware/credentials');

//database connection
const db = require("./src/configs/db");

db.connect();

//use setup
app.use(logger);
app.use(credentials); 
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

// Initialize Passport and set up sessions (if needed)
app.use(passport.initialize());
app.use(passport.session());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Router require
const normalAuth = require('./src/routes/auth/authNormal')
const googleAuthRoute = require('./src/routes/auth/authGoogle')
const song = require('./src/routes/api/songRoute')
const album = require('./src/routes/api/albumRoute')
const band = require('./src/routes/api/bandRoute')
const artist = require('./src/routes/api/artistRoute')

// Router use
app.use('/', require('./src/routes/root'));
app.use('/auth', [normalAuth, googleAuthRoute]);
app.use('/otp', require('./src/routes/verifyEmail/OTP'))
app.use('/verifyemail', require('./src/routes/verifyEmail/emailVerification'))
app.use('/forgotpass', require('./src/routes/forgotPass/forgotPass'))

app.use(verifyJWT);
app.use('/api', [song, album, band, artist]);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
      res.json({ "error": "404 Not Found" });
  } else {
      res.type('txt').send("404 Not Found");
  }
});

// error handler
app.use(errorHandler);

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

