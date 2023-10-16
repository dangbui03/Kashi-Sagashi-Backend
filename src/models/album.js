const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema ({
    name: String,
    song: [
        {
            songID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    artist: {
        artistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }
    },
})

module.exports = mongoose.model("Album", albumSchema);