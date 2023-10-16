const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: String,
    genre: String,
    lyrics: String,
    link: String,
    release_date: Date,
    albums:[
        {
            albumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            }
        }
    ],
    artist1: {
        artistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    },
    artist2: {
        artistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    },
});

module.exports = mongoose.model('Song', SongSchema);
