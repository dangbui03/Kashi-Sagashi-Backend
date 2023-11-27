const express = require('express')
const songCtl = require('../../controllers/SongController/findSongController')
const router = express.Router()

router.post('/song2', songCtl.createSong)
router.get('/song2', songCtl.getAllSong)
router.get('/searchlyrics', songCtl.loadAndSearchLyrics)

module.exports = router