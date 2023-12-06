const express = require('express')
const router = express.Router()
const findSongController = require('../../controllers/SongController/findSongController')
const songCt2 = require('../../controllers/SongController/songController')

const ROLES_LIST = require('../../configs/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/useraddsong')
    .post(songCt2.userCreateSong)

router.route('/adminaddsong')    
    .post(verifyRoles(ROLES_LIST.Admin), songCt2.adminCreateSong)

router.route('/unverified')
    .get(verifyRoles(ROLES_LIST.Admin), songCt2.findUnverified)

router.route('/verified')
    .put(verifyRoles(ROLES_LIST.Admin), songCt2.verifiedSong)

router.route('/')
    .get(songCt2.getAllSong)



router.route('/jsontomongo')
    .get(songCt2.songFromJSONtoMongo)

module.exports = router;