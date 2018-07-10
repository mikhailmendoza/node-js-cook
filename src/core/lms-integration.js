'use strict';

const request = require('request');

const logger = require('../../config/logger-config').Logger;
const soapRequest = require('../utils/createSoapRequest');
const config = require('../../config/config-file');

var routeToLms = function (postData) {
    logger.log('=============Start LMS WS Request==================');
    var wsRequest = soapRequest.createSoapRequest(postData);
    logger.log(wsRequest);
    logger.log('=============End Request===================');

    var requestOptions = {
        'method': 'POST',
        'url': process.env.LMS_WEBSERVICE_ENDPOINT,
        'qs': { 'wsdl': '' },
        'headers': config.LMS_HEADERS,
        'body': wsRequest,
    };

    logger.info('=============Call LMS WS Start=============');
    request(requestOptions, function (error, response) {
        // setTimeout(() => {
        if (error) {
            if (error.code === `ETIMEDOUT`) {
                logger.log('RETRYING');
                return routeToLms(postData);
            }
            else {
                logger.log('===============ws error====================');
                logger.log(error);
                logger.log('===============ws error====================');
            }
        } else {
            logger.log('===============ws resonse==================');
            logger.log(response.body);
            logger.log('===============ws resonse==================');
        }
        logger.log('=============Call LMS WS END=================');
    });
};

module.exports = { routeToLms };