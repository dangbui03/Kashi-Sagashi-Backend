const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema ({
    name: String,
    name_real: String,
    date_of_birth: Date,
    sex: Boolean,
    country: String,
    musician_or_singer: Boolean,
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