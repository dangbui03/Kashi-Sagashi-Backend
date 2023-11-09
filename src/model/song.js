const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {type: String},
    lyrics: {type: String},
    link: {type: String},
    release_date: {type: Date},
    albums:[
        {
            albumID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Album',
            }
        }
    ],
    singers: [
        {
            artistID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist',
            }
        }
    ],
    composers: [
        {
            artistID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Artist',
            }
        }
    ],
    bands: [
        {
            bandId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Band',
            }
        }
    ],
});

module.exports = mongoose.model('Song', songSchema);
