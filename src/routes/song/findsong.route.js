const express = require('express')
const router = express.Router()
const findSongController = require('../../controllers/SongController/findSongController')

router.route('/fetch')
    .get(songCt2.FetchSong)

router.route('/search')
    .get(findSongController.loadAndSearchLyrics)

module.exports = router;