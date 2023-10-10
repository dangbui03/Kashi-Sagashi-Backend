//Express and Node server imports
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const createError = require("http-errors");
const dotenv = require('dotenv');
//require("express-async-errors");

dotenv.config();

// Router imports
const songRoute = require("./src/routes/route");

//database connection
const db = require("./src/configs/db");

db.connect();

const app = express();

//use setup
app.use(morgan("dev"));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());


// Router use
app.use(songRoute);

app.use((req, res, next) => {
	next(createError(404));
});


const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
