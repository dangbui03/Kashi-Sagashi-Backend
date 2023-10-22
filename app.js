//Express and Node server imports
const path = require('path')
const http = require('http');
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//
const verifyJWT = require('./src/middleware/verifyJWT');
const errorHandler = require('./src/middleware/errorHandler');
//const { logger } = require('./src/middleware/logEvents');
const credentials = require('./src/middleware/credentials');

//database connection
const db = require("./src/configs/db");

db.connect();

//use setup
//app.use(logger);
app.use(credentials); 
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Router use
app.use('/', require('./src/routes/root'));
app.use('/song', require('./src/routes/song'));
app.use('/register', require('./src/routes/register'));
app.use('/auth', require('./src/routes/auth'));
app.use('/refresh', require('./src/routes/refresh'));
app.use('/logout', require('./src/routes/logout'));

app.use(verifyJWT);
app.use('/employee', require('./src/routes/api/employees'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// }); 

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
