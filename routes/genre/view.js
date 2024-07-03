const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_retrieve_genre } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "genre"

router.get('/:slug', async function (req, res, next) {
    const slug = req.params.slug;
    let genre = null;

    let r_core_genre = await core_retrieve_genre(slug);
    if (r_core_genre.success) {
        genre = r_core_genre.data
    }

    res.render(service + '/view', {
        menus: getAppMenu(),
        moment: moment,
        genre: genre,
    });
});


module.exports = router;