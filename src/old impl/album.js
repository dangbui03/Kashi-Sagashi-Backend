const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema ({
    Name: String,
    Release_date: Date,
    Link: String,
    Songs: [
        {
            SongID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Song",
            }
        }
    ],
    Artists: [
        {
            ArtistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            }
        },
    ],
    Bands: [
        {
            BandID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Band"
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Album', albumSchema);