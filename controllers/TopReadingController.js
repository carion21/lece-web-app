const express = require('express');
const router = express.Router();

const service = 'top_reading'

// routers
const index = require('../routes/' + service + '/index')

// routes with each router
router.use('/', index)


module.exports = router;