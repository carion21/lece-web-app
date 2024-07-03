const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_subscriber } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "new_subscriber"

router.get('/', async function (req, res, next) {
    res.render(service + '/index', {
        menus: getAppMenu(),
        moment: moment,
    });
});


router.post('/', async function (req, res, next) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    let message = ""
    let error = ""

    if (bcontrol.success) {
        let subscriber_data = {
            name: body.name,
            email: body.email,
        }
        let r_core_new_subscriber = await core_create_subscriber(subscriber_data)

        if (r_core_new_subscriber.success) {
            message =  "Merci pour votre abonnement. Vous recevrez bientôt nos actualités."
            res.render(service + "/index", {
                menus: getAppMenu(),
                moment: moment,
                message: message
            })
        } else {
            error = r_core_new_subscriber.message
        }

    } else {
        error = bcontrol.message
    }

    if (error) {
        res.render(
            service + "/index", {
            menus: getAppMenu(),
            moment: moment,
            rbody: body,
            error: error
        })
    }
});


module.exports = router;