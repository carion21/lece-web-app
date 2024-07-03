const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');

const router = express.Router();

const moment = getMoment();
const service = "home"

router.get('/', async function (req, res, next) {
    res.render('index', {
        menus: getAppMenu(),
        moment: moment,
    });
});


module.exports = router;