const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_retrieve_author } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "author"

router.get('/:slug', async function (req, res, next) {
    const slug = req.params.slug;
    let author = null;

    let r_core_author = await core_retrieve_author(slug);
    if (r_core_author.success) {
        author = r_core_author.data
    }

    res.render(service + '/view', {
        menus: getAppMenu(),
        moment: moment,
        author: author,
    });
});


module.exports = router;