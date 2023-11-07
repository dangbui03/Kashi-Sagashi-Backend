const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema ({
    name: String,
    establish_date: Date,
    country: String,
    artist: [
        {
            artistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        }
    ],
    song: [
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

module.exports = mongoose.model("Band", bandSchema, "band");