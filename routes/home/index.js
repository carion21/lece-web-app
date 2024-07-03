const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { control_service_data, core_create_subscriber, core_get_recents_book } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "home"
const SERVICE_TYPE = "new_subscriber"

router.get('/', async function (req, res, next) {
    let books = []
    let r_core_books = await core_get_recents_book()
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status == true);
    }

    res.render(service + '/index', {
        menus: getAppMenu(),
        moment: moment,
        books
    });
});


router.post('/', async function (req, res, next) {
    let books = []
    let r_core_books = await core_get_recents_book()
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status == true);
    }

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
            message = "Merci pour votre abonnement. Vous recevrez bientôt nos actualités."
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
            books: books,
            rbody: body,
            error: error
        })
    }
});


module.exports = router;