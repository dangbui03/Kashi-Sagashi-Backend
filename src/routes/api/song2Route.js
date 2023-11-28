const express = require('express')
const songCtl = require('../../controllers/SongController/findSongController')
const songCt2 = require('../../controllers/SongController/song2Controller')
const router = express.Router()

router.post('/create', songCt2.createSong)
router.post('/mottocreate',songCt2.createManySong)
router.get('/songs', songCt2.getAllSong)
router.get('/fetch', songCt2.FetchSong)
router.post('/searchlyrics', songCtl.loadAndSearchLyrics)

module.exports = router