const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: String,
    lyrics: String,
    artist: String,

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Song = mongoose.model('Song', SongSchema);
module.exports = Song