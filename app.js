//Express and Node server imports
const path = require('path')
const http = require('http');
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require('dotenv');
//require("express-async-errors");

dotenv.config();

//database connection
const db = require("./src/configs/db");

db.connect();

const app = express();

//serve static files
//app.use('/', express.static(path.join(__dirname, '/public')));

//use setup
app.use(morgan("dev"));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

// Router use
app.use('/song', require('./src/routes/song'));
app.use('/register', require('./src/routes/register'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
	res.status(500).send(err.message);
});

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
