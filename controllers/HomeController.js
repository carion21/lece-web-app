const express = require('express');
const router = express.Router();

const service = 'home'

// routers
const index = require('../routes/' + service + '/index')
const new_message = require('../routes/' + service + '/new_message')
const new_subscriber = require('../routes/' + service + '/new_subscriber')
const contact = require('../routes/' + service + '/contact')
const publish = require('../routes/' + service + '/publish')
const team = require('../routes/' + service + '/team')
const faq = require('../routes/' + service + '/faq')

// routes with each router
router.use('/', index)
router.use('/new_message', new_message)
router.use('/new_subscriber', new_subscriber)
router.use('/contact', contact)
router.use('/publish', publish)
router.use('/team', team)
router.use('/faq', faq)


module.exports = router;