const allowedOrigins = require('./allowedOrigins');
const allowedHeaders = require('./allowedHeaders')

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    allowedHeaders: allowedHeaders,
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
}

module.exports = corsOptions;

// (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true)
//     } else {
//         callback(new Error('Not allowed by CORS'));
//     }
// }