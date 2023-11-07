const song = require("../model/song.js");
const Song = require("../model/song.js");

async function getAllSong(req, res) {
    const song = await Song.find({});
    res.send(song);
}

async function getSongById(req, res) {
    const song = await Song.findById(req.params.id);
    if (!song) {
        return res.status(404).json({ message: "Song not found." });
    }
    res.send(song);
}

async function createSong(req, res) {
    const newSong = new Song(req.body);
    const savedSong = await newSong.save();
    if (savedSong) {
        res.send(savedSong);
    }
}

async function updateSong(req, res) {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!song) {
        return res.status(404).send();
    }
    res.send(song);
}

async function deleteSong(req, res) {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
        return res.status(404).send();
    }
    res.send(true);
}

function getAlbumInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("album.albumID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Song not found." });
            }
            const album = song.album.map(
            (albumData) => albumData.albumID
            );
            res.send(album);
        })
        .catch((error) => {
            res.status(500).json({ message: "Album error. Please try again." });
        });
}

function getSingerInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("artist.artistID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Song not found." });
            }
            const artist = song.artist.map(
                (artistData) => artistData.artistID
            );
            res.send(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Singer error. Please try again." });
        });
}

function getComposerInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("artist.artistID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Song not found." });
            }
            const artist = song.artist.map(
                (artistData) => artistData.artistID
            );
            res.send(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Composer error. Please try again." });
        });
}

function getBandInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("band.bandID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Song not found." });
            }
            const band = song.artist.map(
                (bandData) => bandData.bandID
            );
            res.send(band);
        })
        .catch((error) => {
            res.status(500).json({ message: "Band error. Please try again." });
        });
}

module.exports = {
  getAllSong,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  getAlbumInSong,
  getSingerInSong,
  getComposerInSong,
  getBandInSong,
};