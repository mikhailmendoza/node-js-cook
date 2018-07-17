'use strict';

const request = require('request');
const utils = require('../utils');
const helper = require('../helper');
const updReqSetters = require('../soap-req-model-setters/upd-user-transcript')

const { createRequest, formatter } = utils

const { constants, logger } = helper;


var routeToLms = function (postData) {
    logger.log('=============Start LMS WS Request==================');
    var webhookResponse = updReqSetters.webhookToUpdUserTranscriptReq(postData);
    var lmsRequest = createRequest.objectToXml(webhookResponse);
    var wsRequest = createRequest.createSoapRequest(lmsRequest);
    logger.log(wsRequest);
    logger.log('=============End Request===================');

    var requestOptions = {
        'method': 'POST',
        'url': process.env.LMS_WEBSERVICE_ENDPOINT,
        'qs': { 'wsdl': '' },
        'headers': constants.LMS_HEADERS,
        'body': wsRequest,
    };

    logger.log('=============Call LMS WS Start=============');
    request(requestOptions, function (error, response) {
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

var launchExam = function (res, req) {
    var urlQueryParams;
    urlQueryParams = formatter.urlParameters(req.body);
    res.redirect(constants.CLASSMAKER_URL + urlQueryParams);
}

module.exports = { routeToLms, launchExam };