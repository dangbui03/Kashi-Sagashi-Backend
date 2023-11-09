const Song = require("../model/song.js");

const getAllSong = async (req, res) =>{
    const song = await Song.find();
    if(!song){
        return res.status(204).json({ message: "Song not found."});
    }
    res.json(song);
}

async function getSongById(req, res) {
    const song = await Song.findById(req.params.id);
    if (!song) {
        return res.status(204).json({ message: "Song not found." });
    }
    res.json(song);
}

async function createSong(req, res) {
    const newSong = new Song(req.body);
    const savedSong = await newSong.save();
    if (savedSong) {
        return res.status(201).json(newSong);
    }
}

async function updateSong(req, res) {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!song) {
        return res.status(404).json({ message:"Song not found"});
    }
    res.status(200).json(song);
}

async function deleteSong(req, res) {
    const song = await Song.findByIdAndDelete(req.params.id)
    if (!song) {
        return res.status(404).json({ message:"Song not found"});
    }
    res.status(204).json();
}

function getAlbumInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("album.albumID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Album not found." });
            }
            const album = song.album.map(
            (albumData) => albumData.albumID
            );
            res.status(200).json(album);
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error. Please try again." });
        });
}

function getSingerInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("artist.artistID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Singer not found." });
            }
            const artist = song.artist.map(
                (artistData) => artistData.artistID
            );
            res.status(200).json(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error. Please try again." });
        });
}

function getComposerInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("artist.artistID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Composer not found." });
            }
            const artist = song.artist.map(
                (artistData) => artistData.artistID
            );
            res.status(200).json(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error. Please try again." });
        });
}

function getBandInSong(req, res) {
    const songID = req.params.songID;
    Song.findById(songID)
        .populate("band.bandID")
        .then((song) => {
            if (!song) {
                return res.status(404).json({ message: "Band not found." });
            }
            const band = song.artist.map(
                (bandData) => bandData.bandID
            );
            res.status(200).json(band);
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error. Please try again." });
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
