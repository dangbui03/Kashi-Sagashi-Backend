const express = require("express")
const router = express.Router()
const songController = require('../../controllers/songController');
const ROLES_LIST = require('../../configs/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.get('/allsongs', songController.getAllSongs);
router.get('/artists', songController.getAllArtist);
router.get('/albums', songController.getAllAlbum);

router.patch;
router.options;
module.exports = router;
