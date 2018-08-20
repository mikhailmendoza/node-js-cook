'use strict';

const utils = require('../utils');
const HELPER = require('../helper');

const { URL_FORMATTER } = utils;
const { LOGGER, CLASSMARKER } = HELPER;

var launchExam = function (req, res) {
    var urlQueryParams;
    req.body.cm_user_id = req.body.cm_user_id + '_' + req.body.courseId;
    urlQueryParams = URL_FORMATTER.urlQueryParams(req.body);
    LOGGER.log('REDIRECT TO:' + CLASSMARKER.test_url + urlQueryParams);
    res.redirect(CLASSMARKER.test_url + urlQueryParams);
};

module.exports = { launchExam };