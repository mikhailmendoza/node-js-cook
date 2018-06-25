'use strict';

var request = require('request');
var url = require('url');

var logger = require('../../../config/logger-config').Logger;
var formatter = require('../../utils/url-formatter');
var validator = require('../../utils/validation')

const POST_URL = 'https://api.classmarker.com/v1/accesslists/';

function addClassMarkRecord(req, res) {
    var updatedUrl = formatter.setQueryParams(POST_URL, req);
    logger.info('Request Body:' + req.body);
    request.post({
        url: updatedUrl,
        body: req.body
    },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (validator.isJson(body)) {
                    res.json(JSON.parse(body));
                    logger.info('Response:' + body);
                }
            } else {
                res.statusCode = response.statusCode.send(error);
                logger.error(error);
            }
            logger.info(`End Access for: ${url.parse(req.url).pathname}`);
            logger.info('===============================================');
        });
}

module.exports = { addClassMarkRecord };
