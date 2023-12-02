const express = require('express')
const songCtl = require('../../controllers/SongController/findSongController')
const songCt2 = require('../../controllers/SongController/song2Controller')
const router = express.Router()

router.post('/songus', songCt2.userCreateSong)
router.post('/songad', songCt2.adminCreateSong)
router.get('/song/unverified', songCt2.findUnverified)
router.put('/song/verified',songCt2.verifiedSong)
router.get('/songs', songCt2.getAllSong)
router.get('/fetch', songCt2.FetchSong)
router.post('/searchlyrics', songCtl.loadAndSearchLyrics)

module.exports = router