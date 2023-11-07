const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: String,
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
    singer: [
        {
            artistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist"
            }
        }
    ],
    composer: [
        {
            artistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist"
            }
        }
    ],
    band: [
        {
            bandID:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Band"
            }
        }
    ],
});

module.exports = mongoose.model("Song", songSchema , "song");
