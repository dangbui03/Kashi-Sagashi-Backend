const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: String,
    genre: String,
    lyrics: String,
    realease_date: Date,
    albums:[
        {
            albumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            }
        }
    ],
    singer: [{
        singerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
        }
    }],
    composer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }
    ]
});

module.exports = mongoose.model('Song', SongSchema);
