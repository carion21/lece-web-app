const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_list_book } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "book"

router.get('/', async function (req, res, next) {
    let books = []

    let r_core_books = await core_list_book();
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status == true);
    }

    res.render(service + '/list', {
        menus: getAppMenu(),
        moment: moment,
        books: books,
        text: "Tous les livres"
    });
});

router.get('/new', async function (req, res, next) {
    let books = []

    let r_core_books = await core_list_book();
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status && book.isRecent);
    }

    res.render(service + '/list', {
        menus: getAppMenu(),
        moment: moment,
        books: books,
        text: "Nouveautés"
    });
});

router.get('/coming', async function (req, res, next) {
    let books = []

    let r_core_books = await core_list_book();
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status && book.isInReleaseFuture);
    }

    res.render(service + '/list', {
        menus: getAppMenu(),
        moment: moment,
        books: books,
        text: "À paraître"
    });
});

module.exports = router;