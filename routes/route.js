const express = require("express")
const router = express.Router()
const songController = require('../controllers/songController')

router.get('/songs', songController.getAllSongs);

router.patch;
router.options;
module.exports = router;
