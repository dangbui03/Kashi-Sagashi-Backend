const express = require('express')
const bandCtl = require('../../controllers/bandController')
const router = express.Router()
const ROLES_LIST = require('../../configs/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/band')
    .get(bandCtl.getAllBand)
    .post(bandCtl.createBand)

router.route('/band/:id')
    .get(bandCtl.getBandById)
    .put(verifyRoles(ROLES_LIST.Admin), bandCtl.updateBand)
    .delete(verifyRoles(ROLES_LIST.Admin), bandCtl.deleteBand)

router.route('/band/:bandID/album')
    .get(bandCtl.getAlbumInBand)

router.route('/band/:bandID/artist')
    .get(bandCtl.getArtistInBand)

router.route('band/:bandID/song')
    .get(bandCtl.getSongInBand)

// router.get('/band', )
// router.get('/band/:id', bandCtl.getBandById)
// router.get('/band/:bandID/album/', bandCtl.getAlbumInBand)
// router.get('band/:bandID/artist/',bandCtl.getArtistInBand)
// router.get('band/:bandID/song/',bandCtl.getSongInBand)
// router.post('/band', bandCtl.createBand)
// router.put('/band/:id', bandCtl.updateBand)
// router.delete('/band/:id', bandCtl.deleteBand)

module.exports = router
