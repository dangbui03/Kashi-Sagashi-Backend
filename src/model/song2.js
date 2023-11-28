const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
    {
        Name: {type: String},
        Lyrics: {type: String},
        Link: {type: String},
        Release_date: {type: Date},
        Artist: {
            type: String,
        },
        Album: {
            type: String
        },
        Verified: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)


module.exports = mongoose.model('Song2', songSchema);
