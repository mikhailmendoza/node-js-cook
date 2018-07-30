'use strict';

const utils = require('../utils');

const HELPER = require('../helper');

const { URL_FORMATTER } = utils;
const { LOGGER } = HELPER;

const CLASSMAKER_URL = 'https://www.classmarker.com/online-test/start/?';

var launchExam = function (req, res) {
    var urlQueryParams;
    req.body.cm_user_id = req.body.cm_user_id + '_' + req.body.courseId;
    urlQueryParams = URL_FORMATTER.urlQueryParams(req.body);
    LOGGER.log('REDIRECT TO:' + CLASSMAKER_URL + urlQueryParams);
    res.redirect(CLASSMAKER_URL + urlQueryParams);
};

module.exports = { launchExam };