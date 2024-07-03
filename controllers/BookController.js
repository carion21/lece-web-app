const express = require('express');
const router = express.Router();

const service = 'book'

// routers
const list = require('../routes/' + service + '/list')
const view = require('../routes/' + service + '/view')


// routes with each router
router.use('/list', list)
router.use('/view', view)


module.exports = router;