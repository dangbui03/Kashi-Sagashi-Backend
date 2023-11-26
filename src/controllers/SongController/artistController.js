const Artist = require("../../model/artist.js");

async function getAllArtist(req, res) {
    const artist = await Artist.find();
    if(!artist){
        return res.status(204).json({ message: "Artist not found"})
    }
    res.json(artist);
}

async function getArtistById(req, res) {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
        return res.status(204).json({ message: "Artist not found." });
    }
    res.json(artist);
}

async function createArtist(req, res) {
    const newArtist = new Artist(req.body);
    const savedArtist = await newArtist.save();
    if (savedArtist) {
        return res.status(201).json(savedArtist);
    }
}

async function updateArtist(req, res) {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!artist) {
        return res.status(404).json({ message: "Artist not found"});
    }
    res.send(artist);
}

async function deleteArtist(req, res) {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
        return res.status(404).json({ message: "Artist not found"});
    }
    res.status(204).json();
}

function getAlbumInArtist(req, res) {
    const artistID = req.params.artistID;
    Artist.findById(artistID)
        .populate("album.albumID")
        .then((artist) => {
            if (!artist) {
                return res.status(404).json({ message: "Artist not found." });
            }
            const album = artist.album.map(
            (albumData) => albumData.albumID
            );
            res.send(album);
        })
        .catch((error) => {
            res.status(500).json({ message: "Album error. Please try again." });
        });
}

function getSongInArtist(req, res) {
    const artistID = req.params.artistID;
    Artist.findById(artistID)
        .populate("song.songID")
        .then((artist) => {
            if (!artist) {
                return res.status(404).json({ message: "Artist not found." });
            }
            const song = artist.song.map(
                (songData) => songData.songID
            );
            res.send(song);
        })
        .catch((error) => {
            res.status(500).json({ message: "Song error. Please try again." });
        });
}


module.exports = {
    getAllArtist,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
    getAlbumInArtist,
    getSongInArtist,
};