const express = require('express')
const artistCtl = require('../../controllers/SongController/artistController')
const verifyRoles = require('../middleware/verifyRoles')
const ROLES_LIST = require('../configs/roles_list')
const router = express.Router()

router.route('/artist')
    .get(artistCtl.getAllArtist)
    .post(artistCtl.createArtist)

router.route('/artist/:id')
    .get(artistCtl.getArtistById)
    .put(artistCtl.updateArtist)
    .delete(verifyRoles(ROLES_LIST.Admin), artistCtl.deleteArtist)

router.route('/artist/:artistID/album/')
    .get(artistCtl.getAlbumInArtist)

router.route('/artist/:artistID/song/')
    .get(artistCtl.getSongInArtist)


// router.get('/artist', artistCtl.getAllArtist)
// router.get('/artist/:id', artistCtl.getArtistById)
// router.get('/artist/:artistID/album/', artistCtl.getAlbumInArtist)
// router.get('/artist/:artistID/song/', artistCtl.getSongInArtist)
// router.post('/artist', artistCtl.createArtist)
// router.put('/artist/:id', artistCtl.updateArtist)
// router.delete('/artist/:id', artistCtl.deleteArtist)

module.exports = router