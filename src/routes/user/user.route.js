const express = require('express')

const router = express.Router()
const ROLES_LIST = require('../../configs/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')
const userController = require('../../controllers/UserController/userController')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUser)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

module.exports = router;