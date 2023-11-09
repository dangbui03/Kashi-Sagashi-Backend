const express = require('express')
const bandCtl = require('../controllers/bandController')
const router = express.Router()
router.get('/band', bandCtl.getAllBand)
router.get('/band/:id', bandCtl.getBandById)
router.get('/band/:bandID/album/', bandCtl.getAlbumInBand)
router.get('band/:bandID/artist/',bandCtl.getArtistInBand)
router.get('band/:bandID/song/',bandCtl.getSongInBand)
router.post('/band', bandCtl.createBand)
router.put('/band/:id', bandCtl.updateBand)
router.delete('/band/:id', bandCtl.deleteBand)
module.exports = router