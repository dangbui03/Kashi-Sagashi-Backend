const express = require('express')
const songCtl = require('../../controllers/SongController/findSongController')
const songCt2 = require('../../controllers/SongController/songController')
const router = express.Router()

router.post('/useraddsong', songCt2.userCreateSong)
router.post('/adminaddsong', songCt2.adminCreateSong)

router.get('/unverified', songCt2.findUnverified)
router.put('/verified',songCt2.verifiedSong)

router.get('/', songCt2.getAllSong)
router.get('/fetch', songCt2.FetchSong)
router.get('/search', songCtl.loadAndSearchLyrics)

router.get('/jsontomongo', songCt2.songFromJSONtoMongo)

module.exports = router;