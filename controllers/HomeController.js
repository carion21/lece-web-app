const express = require('express');
const router = express.Router();

const service = 'home'

// routers
const index = require('../routes/' + service + '/index')
const new_message = require('../routes/' + service + '/new_message')
const new_subscriber = require('../routes/' + service + '/new_subscriber')
const contact = require('../routes/' + service + '/contact')

// routes with each router
router.use('/', index)
router.use('/new_message', new_message)
router.use('/new_subscriber', new_subscriber)
router.use('/contact', contact)


module.exports = router;