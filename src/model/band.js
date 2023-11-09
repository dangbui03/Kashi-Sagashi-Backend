const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema ({
    name: String,
    establish_date: Date,
    country: String,
    artists: [
        {
            artistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        }
    ],
    songs: [
        {
            songID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    albums: [
        {
            albumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            }
        }
    ],
})

module.exports = mongoose.model("Band", bandSchema);