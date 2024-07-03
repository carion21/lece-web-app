const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_list_author } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "author"

router.get('/', async function (req, res, next) {
    let authors = []

    let r_core_authors = await core_list_author();
    if (r_core_authors.success) {
        authors = r_core_authors.data;
        authors = authors.filter(author => author.status == true);
    }

    res.render(service + '/list', {
        menus: getAppMenu(),
        moment: moment,
        authors: authors,
    });
});


module.exports = router;