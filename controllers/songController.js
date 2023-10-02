const Song = require('../models/songs')

//const getAllSong = async (req, res) => {
//  const songs = await Song.find();
//  if (!songs) return res.status(204).json({ message: "No rooms found." });
//  res.json(songs);
//};
function getAllSongs(req, res) {
  Song.find()
      .then((song) => {
        res.status(200).json(song);
      })
      .catch((error) => {
        res.status(500).json({message: 'error'});
      });
}

module.exports = {
  //getListSong,
  getAllSongs
};
