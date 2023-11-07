const band = require("../model/band.js");
const Band = require("../model/band.js");

async function getAllBand(req, res) {
    const band = await Band.find({});
    res.send(band);
}

async function getBandById(req, res) {
    const band = await Band.findById(req.params.id);
    if (!band) {
        return res.status(404).json({ message: "Band not found." });
    }
    res.send(band);
}

async function createBand(req, res) {
    const newBand = new Band(req.body);
    const savedBand = await newBand.save();
    if (savedBand) {
        res.send(savedBand);
    }
}

async function updateBand(req, res) {
    const band = await Band.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!band) {
        return res.status(404).send();
    }
    res.send(band);
}

async function deleteBand(req, res) {
    const band = await Band.findByIdAndDelete(req.params.id);
    if (!band) {
        return res.status(404).send();
    }
    res.send(true);
}

function getAlbumInBand(req, res) {
    const bandID = req.params.bandID;
    Band.findById(bandID)
        .populate("album.albumID")
        .then((band) => {
            if (!band) {
                return res.status(404).json({ message: "Band not found." });
            }
            const album = band.album.map(
            (albumData) => albumData.albumID
            );
            res.send(album);
        })
        .catch((error) => {
            res.status(500).json({ message: "Album error. Please try again." });
        });
}

function getArtistInBand(req, res) {
    const bandID = req.params.bandID;
    Band.findById(bandID)
        .populate("artist.artistID")
        .then((band) => {
            if (!band) {
                return res.status(404).json({ message: "Band not found." });
            }
            const artist = band.artist.map(
                (artistData) => artistData.artistID
            );
            res.send(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Artist error. Please try again." });
        });
}

function getSongInBand(req, res) {
    const bandID = req.params.bandID;
    Band.findById(bandID)
        .populate("song.songID")
        .then((band) => {
            if (!band) {
                return res.status(404).json({ message: "Band not found." });
            }
            const song = bands.song.map(
                (songData) => songData.songID
            );
            res.send(song);
        })
        .catch((error) => {
            res.status(500).json({ message: "Song error. Please try again." });
        });
}



module.exports = {
    getAllBand,
    getBandById,
    createBand,
    updateBand,
    deleteBand,
    getAlbumInBand,
    getArtistInBand,
    getSongInBand,
};