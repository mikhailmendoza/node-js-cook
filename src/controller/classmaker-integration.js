'use strict';

const utils = require('../utils');

const { URL_FORMATTER } = utils;

const CLASSMAKER_URL = 'https://www.classmarker.com/online-test/start/?';

var launchExam = function (req, res) {
    var urlQueryParams;
    urlQueryParams = URL_FORMATTER.urlQueryParams(req.body);
    logger.log('REDIRECT TO:' + CLASSMAKER_URL + urlQueryParams);
    res.redirect(CLASSMAKER_URL + urlQueryParams);
};

module.exports = { launchExam };