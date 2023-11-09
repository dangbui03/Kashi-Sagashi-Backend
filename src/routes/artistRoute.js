const express = require('express')
const artistCtl = require('../controllers/artistController')
const router = express.Router()

router.get('/artist', artistCtl.getAllArtist)
router.get('/artist/:id', artistCtl.getArtistById)
router.get('/artist/:artistID/album/', artistCtl.getAlbumInArtist)
router.get('/artist/:artistID/song/', artistCtl.getSongInArtist)
router.post('/artist', artistCtl.createArtist)
router.put('/artist/:id', artistCtl.updateArtist)
router.delete('/artist/:id', artistCtl.deleteArtist)
module.exports = router