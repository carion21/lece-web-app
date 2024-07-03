
const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "new_subscriber"

router.get('/', async function (req, res, next) {
    res.render('index', {
        menus: getAppMenu(),
        moment: moment,
    });
});

router.post('/', async function (req, res, next) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    let error = ""

    if (bcontrol.success) {
        let genre_data = {
            name: body.name,
            description: body.description
        }
        let r_core_new_genre = await core_create_genre(req.session.jwt_token, genre_data)

        if (r_core_new_genre.success) {
            res.redirect(routedebase + "/genre_management/genre_list")
        } else {
            error = r_core_new_genre.message
        }

    } else {
        error = bcontrol.message
    }

    if (error) {
        res.render(
            profile + "/genre_management/new_genre", {
            appName: APP_NAME,
            appVersion: APP_VERSION,
            appDescription: APP_DESCRIPTION,
            service: service,
            rbody: body,
            error: error
        })
    }
});


module.exports = router;