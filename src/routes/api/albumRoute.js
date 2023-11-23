const express = require('express')
const albumCtl = require('../../controllers/albumController')
const router = express.Router()
const ROLES_LIST = require('../../configs/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/album')
    .get(albumCtl.getAllAlbum)
    .post(albumCtl.createAlbum)

router.route('/album/:id')
    .get(albumCtl.getAlbumById)
    .put(verifyRoles(ROLES_LIST.Admin), albumCtl.updateAlbum)
    .delete(verifyRoles(ROLES_LIST.Admin), albumCtl.deleteAlbum)

router.route('/album/:albumID/song/')
    .get(albumCtl.getSongInAlbum)

router.route('/album/:albumID/artist/')
    .get(albumCtl.getArtistInAlbum)

router.route('/album/:albumID/band/')
    .get(albumCtl.getBandInAlbum)
    
// router.get('/album', albumCtl.getAllAlbum)
// router.get('/album/:id', albumCtl.getAlbumById)
// router.get('/album/:albumID/song/', albumCtl.getSongInAlbum)
// router.get('/album/:albumID/artist/', albumCtl.getArtistInAlbum)
// router.get('/album/:albumID/band/', albumCtl.getBandInAlbum)
// router.post('/album', albumCtl.createAlbum)
// router.put('/album/:id', albumCtl.updateAlbum)
// router.delete('/album/:id', albumCtl.deleteAlbum)
module.exports = router