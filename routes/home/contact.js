const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_message } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "new_subscriber"


router.get('/', async function (req, res, next) {
    res.render(service + '/contact', {
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
        let message_data = {
            name: body.name,
            email: body.email,
            phone: body.phone,
            subject: body.subject,
            content: body.content
        }
        let r_core_new_message = await core_create_message(message_data)

        if (r_core_new_message.success) {
            message = "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
            res.render(service + "/contact", {
                menus: getAppMenu(),
                moment: moment,
                message: message
            })
        } else {
            error = r_core_new_message.message
        }

    } else {
        error = bcontrol.message
    }

    if (error) {
        res.render(
            service + "/contact", {
            menus: getAppMenu(),
            moment: moment,
            rbody: body,
            error: error
        })
    }
});


module.exports = router;