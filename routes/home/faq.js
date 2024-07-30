const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_message } = require('../../config/global_functions');
const { FAQS } = require('../../config/consts');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "faq"


router.get('/', async function (req, res, next) {
    const faqs = FAQS.filter(faq => faq.active == true);
    res.render(service + '/faq', {
        menus: getAppMenu(),
        moment: moment,
        faqs: faqs
    });
});


module.exports = router;