const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_retrieve_book } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "book"

router.get('/:slug', async function (req, res, next) {
    const slug = req.params.slug;
    let book = null;

    let r_core_book = await core_retrieve_book(slug);
    if (r_core_book.success) {
        book = r_core_book.data
    }

    res.render(service + '/view', {
        menus: getAppMenu(),
        moment: moment,
        book: book,
    });
});


module.exports = router;