const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema ({
    name: String,
    release_date: Date,
    link: String,
    songs: [
        {
            songID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    artists: [
        {
            artistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        },
    ],
    bands: [
        {
            bandID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Band"
            }
        }
    ]
})

module.exports = mongoose.model('Album', albumSchema);