const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema ({
    name: String,
    date_of_birth: Date,
    sex: Boolean,
    country: String,
    role: [String],
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

module.exports = mongoose.model("Artist", artistSchema);