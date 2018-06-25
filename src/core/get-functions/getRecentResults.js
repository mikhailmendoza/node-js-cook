'use strict';

var request = require('request');
var url = require('url');

var formatter = require('../../utils/url-formatter');
var validator = require('../../utils/validation');
var logger = require('../../../config/logger-config').Logger;

const GET_URL = 'https://api.classmarker.com/v1/groups/recent_results.json';

function getRecentResults(req, res) {

    var updatedUrl = formatter.setQueryParams(GET_URL, req)
    request.get({
        url: updatedUrl
    },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (validator.isJson(body)) {
                    res.json(JSON.parse(body));
                    logger.info(`Response: ${body}`);
                }
            } else {
                // res.statusCode = response.statusCode.send(error);
                logger.error(error);
            }
            
            logger.info(`End Access for: ${url.parse(req.url).pathname}`);
            logger.info('===============================================')
        });
    return res
}

module.exports = { getRecentResults };


