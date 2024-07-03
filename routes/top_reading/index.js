const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_list_book, core_list_author, core_list_genre } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "top_reading"

router.get('/', async function (req, res, next) {
    let books = []
    let authors = []
    let genres = []

    let r_core_books = await core_list_book();
    if (r_core_books.success) {
        books = r_core_books.data;
        books = books.filter(book => book.status == true);
    }

    let r_core_authors = await core_list_author();
    if (r_core_authors.success) {
        authors = r_core_authors.data;
        authors = authors.filter(author => author.status == true);
    }

    let r_core_genres = await core_list_genre();
    if (r_core_genres.success) {
        genres = r_core_genres.data;
        genres = genres.filter(genre => genre.status == true);
    }

    res.render(service + '/index', {
        menus: getAppMenu(),
        moment: moment,
        books: books,
        authors: authors,
        genres
    });
});


module.exports = router;