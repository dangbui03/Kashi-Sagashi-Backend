const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    Name: {type: String},
    Lyrics: {type: String},
    Link: {type: String},
    Release_date: {type: Date},
    Albums:[
        {
            AlbumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Album',
            }
        }
    ],
    Artist: [
        {
            ArtistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
            }
        },
    ],
    Bands: [
        {
            BandId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Band',
            }
        }
    ],
}, {
    timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
