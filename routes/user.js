const express = require('express')
const router = express.Router()
const { showCurrentUser } = require('../controllers/User')
const { authenticateUser } = require('../middleware/authenticateUser')


router.route('/showMe').get(authenticateUser, showCurrentUser)

module.exports = router