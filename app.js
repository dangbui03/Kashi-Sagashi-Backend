const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const db = require('./configs/db')
const morgan = require('morgan');
const createError = require('http-errors');
require('express-async-errors');

require("dotenv").config();
db.connect()

const songRoute = require('./routes/route');

const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin', songRoute)

const port = 3001;
app.listen(port, () => {
    console.log(`listen on port ${port}`)
})




