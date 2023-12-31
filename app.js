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
const bodyParser = require("body-parser");
const helmet = require("helmet");
require('./src/configs/passport')

const app = express();

//
const corsOptions = require('./src/configs/corsOptions')
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
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.json());

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

//route using 
app.use('/', express.static(path.join(__dirname, 'src', '/public')));
app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

app.use('/api/v2', require('./src/routes/index'))

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'src', 'views', '404.html'));
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
  console.log(`Server is running at http://127.0.0.1:${port}`);
});

