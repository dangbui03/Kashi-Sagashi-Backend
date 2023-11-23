const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema ({
    Name: String,
    Date_of_birth: Date,
    Gender: String,
    Country: String,
    Role: String,
    Songs: [
        {
            SongID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    Albums: [
        {
            AlbumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            }
        }
    ],
}, {
    timestamps: true,
})

module.exports = mongoose.model("Artist", artistSchema);