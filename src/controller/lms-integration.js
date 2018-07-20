'use strict';

const request = require('request');
const jsonxml = require('jsontoxml');

const utils = require('../utils');
const { createRequest, formatter } = utils;

const helper = require('../helper');
const { constants, logger } = helper;

const modelSetter = require('../soap-req-model-setters');
const { updUserTranscript } = modelSetter;

var routeToLms = function (webhookData) {
  logger.log(`=============== POPULATE LMS WEBSERVICE REQUEST START ===============`);
  var webhookResponse = updUserTranscript.webhookToUpdUserTranscriptReq(webhookData);
  var xmlData = jsonxml(webhookResponse);
  var lmsSoapRequest = createRequest.createUpdateUserTranscriptReq(xmlData);
  logger.log(lmsSoapRequest);
  logger.log(`=============== POPULATE LMS WEBSERVICE REQUEST END ===============`);

  var requestOptions = {
    'method': 'POST',
    'url': process.env.LMS_WEBSERVICE_ENDPOINT,
    'qs': { 'wsdl': '' },
    'headers': constants.LMS_HEADERS,
    'body': lmsSoapRequest
  };
  logger.log(`=============== CALL LMS WEBSERVICE START ===============`);
  request(requestOptions, function (error, response) {
    if (error) {
      if (error.code === `ETIMEDOUT`) {
        logger.log('RETRYING');
        return routeToLms(webhookData);
      } else {
        logger.log(`=============== WEBSERVICE RESPONSE ERROR ===============`);
        logger.log(error);
      }
    } else {
      logger.log(`=============== WEBSERVICE RESPONSE ===============`);
      logger.log(response.body);
    }
    logger.log(`=============== CALL LMS WEBSERVICE END ===============`);
  });
};

var launchExam = function (res, req) {
  var urlQueryParams;
  urlQueryParams = formatter.urlQueryParams(req.body);
  logger.log(`=============== Redirect to ${constants.CLASSMAKER_URL}${urlQueryParams}===============`);
  res.redirect(constants.CLASSMAKER_URL + urlQueryParams);
};

module.exports = { routeToLms, launchExam };
