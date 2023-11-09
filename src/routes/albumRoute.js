const express = require('express')
const albumCtl = require('../controllers/albumController')
const router = express.Router()

router.get('/album', albumCtl.getAllAlbum)
router.get('/album/:id', albumCtl.getAlbumById)
router.get('/album/:albumID/song/', albumCtl.getSongInAlbum)
router.get('/album/:albumID/artist/', albumCtl.getArtistInAlbum)
router.get('/album/:albumID/band/', albumCtl.getBandInAlbum)
router.post('/album', albumCtl.createAlbum)
router.put('/album/:id', albumCtl.updateAlbum)
router.delete('/album/:id', albumCtl.deleteAlbum)
module.exports = router