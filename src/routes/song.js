const express = require("express")
const router = express.Router()
const songController = require('../controllers/songController')

router.get('/allsongs', songController.getAllSongs);
router.get('/artists', songController.getAllArtist);
router.get('/albums', songController.getAllAlbum);

router.patch;
router.options;
module.exports = router;
