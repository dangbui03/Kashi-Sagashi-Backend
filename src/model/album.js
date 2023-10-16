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
    composer: {
        composerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }
    },
})

module.exports = mongoose.model("Album", albumSchema);