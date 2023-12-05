const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema ({
    Name: String,
    Establish_date: Date,
    Country: String,
    Role: String,
    Artists: [
        {
            ArtistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        }
    ],
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
    timestamps: true
})

module.exports = mongoose.model("Band", bandSchema);