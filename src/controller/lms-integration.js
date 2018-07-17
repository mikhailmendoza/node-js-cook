'use strict';

const request = require('request');

const utils = require('../utils');
const helper = require('../helper');
const modelSetter = require('../soap-req-model-setters')

const { constants, logger } = helper;
const { updUserTranscript } = modelSetter;
const { createRequest, formatter } = utils;

var routeToLms = function (webhookData) {
    logger.log(`=============== Start LMS WS Request ===============`);
    var webhookResponse = updUserTranscript.webhookToUpdUserTranscriptReq(webhookData);
    var lmsRequest = createRequest.objectToXml(webhookResponse);
    var wsRequest = createRequest.createUpdateUserTranscriptReq(lmsRequest);
    logger.log(wsRequest);
    logger.log(`=============== End Request ===============`);

    var requestOptions = {
        'method': 'POST',
        'url': process.env.LMS_WEBSERVICE_ENDPOINT,
        'qs': { 'wsdl': '' },
        'headers': constants.LMS_HEADERS,
        'body': wsRequest,
    };

    logger.log(`=============== Call LMS WS Start ===============`);
    request(requestOptions, function (error, response) {
        if (error) {
            if (error.code === `ETIMEDOUT`) {
                logger.log('RETRYING');
                return routeToLms(webhookData);
            }
            else {
                logger.log(`=============== ws error ===============`);
                logger.log(error);
                logger.log(`=============== ws error ===============`);
            }
        } else {
            logger.log(`=============== ws resonse ===============`);
            logger.log(response.body);
            logger.log(`=============== ws resonse ===============`);
        }
        logger.log(`=============== Call LMS WS END ===============`);
    });
};

var launchExam = function (res, req) {
    var urlQueryParams;
    urlQueryParams = formatter.urlQueryParams(req.body);
    res.redirect(constants.CLASSMAKER_URL + urlQueryParams);
}

module.exports = { routeToLms, launchExam };