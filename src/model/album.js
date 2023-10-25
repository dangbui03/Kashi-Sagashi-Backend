const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema ({
    name: String,
    release_date: Date,
    link: String,
    song: [
        {
            songID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    Artist: [
        {
            ArtistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        },
    ],
    Band: [
        {
            BandID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Band"
            }
        }
    ]
})

module.exports = mongoose.model("Album", albumSchema);