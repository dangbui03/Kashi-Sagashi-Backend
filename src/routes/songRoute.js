const express = require('express')
const songCtl = require('../controllers/songController')
const router = express.Router()

router.get('/song', songCtl.getAllSong)
router.get('/song/:id', songCtl.getSongById)
router.get('/song/:songID/album/', songCtl.getAlbumInSong)
router.get('/song/:songID/singer/',songCtl.getSingerInSong)
router.get('/song/:songID/composer/',songCtl.getComposerInSong)
router.get('/song/:songID/band/',songCtl.getBandInSong)
router.post('/song', songCtl.createSong)
router.put('/song/:id', songCtl.updateSong)
router.delete('/song/:id', songCtl.deleteSong)

module.exports = router