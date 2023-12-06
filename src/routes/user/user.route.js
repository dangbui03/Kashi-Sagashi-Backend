const express = require('express')

const router = express.Router()
const ROLES_LIST = require('../../configs/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/giveadmin')
    .put(verifyRoles(ROLES_LIST.Admin), )

router.route('/takeadmin')
    .put(verifyRoles(ROLES_LIST.Admin), )

router.route('/user')
    .get(verifyRoles(ROLES_LIST.Admin), )

router.route('/user/email')
    .delete(verifyRoles(ROLES_LIST.Admin), )
module.exports = router;