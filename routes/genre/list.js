const express = require('express');

const { getAppName, getMoment, getAppMenu } = require('../../config/utils');
const { core_list_genre } = require('../../config/global_functions');

const router = express.Router();

const moment = getMoment();
const service = "genre"

router.get('/', async function (req, res, next) {
    let genres = []

    let r_core_genres = await core_list_genre();
    if (r_core_genres.success) {
        genres = r_core_genres.data;
        genres = genres.filter(genre => genre.status == true);
    }

    res.render(service + '/list', {
        menus: getAppMenu(),
        moment: moment,
        genres: genres,
    });
});


module.exports = router;