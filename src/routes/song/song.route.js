const express = require('express')
const router = express.Router()
const songCt2 = require('../../controllers/SongController/songController')

const ROLES_LIST = require('../../configs/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/useraddsong')
    .post(verifyRoles(ROLES_LIST.User), songCt2.userCreateSong)

router.route('/adminaddsong')    
    .post(verifyRoles(ROLES_LIST.Admin), songCt2.adminCreateSong)

router.route('/unverified')
    .get(verifyRoles(ROLES_LIST.Admin), songCt2.findUnverified)

router.route('/verified')
    .put(verifyRoles(ROLES_LIST.Admin), songCt2.verifiedSong)

router.route('/delete')
    .delete(verifyRoles(ROLES_LIST.Admin), songCt2.deleteSong)

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), songCt2.getAllSong)

router.route('/')
    .get(verifyRoles(ROLES_LIST.User), songCt2.getSongBySongName)

router.route('/jsontomongo')
    .get(songCt2.songFromJSONtoMongo)

router.route('/fetch')
    .get(songCt2.FetchSong)

module.exports = router;