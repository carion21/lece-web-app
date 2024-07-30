const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_message } = require('../../config/global_functions');
const { TEAM } = require('../../config/consts');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "team"


router.get('/', async function (req, res, next) {
    res.render(service + '/team', {
        menus: getAppMenu(),
        moment: moment,
        team: TEAM
    });
});


module.exports = router;