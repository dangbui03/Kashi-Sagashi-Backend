const Album = require("../model/album.js");

async function getAllAlbum(req, res) {
    const album = await Album.find();
    if(!album){
        return res.status(204).json({ message: "Album not found."});
    }
    res.json(album);
}

async function getAlbumById(req, res) { 
    const album = await Album.findById(req.params.id);
    if (!album) {
        return res.status(204).json({ message: "Album not found." });
    }
    res.json(album);
}

async function createAlbum(req, res) {
    const newAlbum = new Album(req.body);
    const savedAlbum = await newAlbum.save();
    if (savedAlbum) {
        return res.status(201).json(savedAlbum);
    }
}

async function updateAlbum(req, res) {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!album) {
        return res.status(404).json({ message: "Album not found"});
    }
    res.status(204).json(album);
}

async function deleteAlbum(req, res) {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
        return res.status(404).json({ message: "Album not found"});
    }
    res.status(204).json();
}

function getSongInAlbum(req, res) {
    const albumID = req.params.albumID;
    Album.findById(AlbumID)
        .populate("song.songID")
        .then((album) => {
            if (!album) {
                return res.status(404).json({ message: "Album not found." });
            }
            const song = album.song.map(
            (songData) => songData.songID
            );
            res.send(song);
        })
        .catch((error) => {
            res.status(500).json({ message: "Song error. Please try again." });
        });
}

function getArtistInAlbum(req, res) {
    const albumID = req.params.albumID;
    Album.findById(AlbumID)
        .populate("artist.artistID")
        .then((album) => {
            if (!album) {
                return res.status(404).json({ message: "Album not found." });
            }
            const artist = album.artist.map(
                (artistData) => artistData.artistID
            );
            res.send(artist);
        })
        .catch((error) => {
            res.status(500).json({ message: "Artist error. Please try again." });
        });
}

function getBandInAlbum(req, res) {
    const albumID = req.params.albumID;
    Album.findById(albumID)
        .populate("band.bandID")
        .then((album) => {
            if (!album) {
                return res.status(404).json({ message: "Album not found." });
            }
            const band = album.artist.map(
                (bandData) => bandData.bandID
            );
            res.send(band);
        })
        .catch((error) => {
            res.status(500).json({ message: "Band error. Please try again." });
        });
}

module.exports = {
  getAllAlbum,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  getSongInAlbum,
  getArtistInAlbum,
  getBandInAlbum,
};