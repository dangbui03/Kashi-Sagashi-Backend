const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema ({
    Singer: String,
    Composer: String,
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

module.exports = mongoose.model("Artist", artistSchema);