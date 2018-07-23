'use strict';

const request = require('request');
const jsonxml = require('jsontoxml');

const MODEL_SETTER = require('../soap-req-model-setters');
const HELPER = require('../helper');
const UTILS = require('../utils');

const { CREATE_SOAP_REQUEST } = UTILS;
const { UPD_USER_TRANSCRIPT } = MODEL_SETTER;
const { LOGGER } = HELPER;

const LMS_HEADERS = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + Buffer.from(process.env.LMS_USERNAME + ':' + process.env.LMS_PASSWORD).toString('base64'),
  'SOAPAction': process.env.LMS_SOAP_ACTION,
  'Connection': 'Keep-Alive'
};

var lmsIntegration = function (webhookData) {
  LOGGER.log('POPULATE LMS WEBSERVICE REQUEST START');
  var webhookResponse = UPD_USER_TRANSCRIPT.webhookToUpdUserTranscriptReq(webhookData);
  var xmlData = jsonxml(webhookResponse);
  var lmsSoapRequest = CREATE_SOAP_REQUEST.createUpdateUserTranscriptReq(xmlData);
  LOGGER.log(lmsSoapRequest);
  LOGGER.log('POPULATE LMS WEBSERVICE REQUEST END');

  var requestOptions = {
    'method': 'POST',
    'url': process.env.LMS_WEBSERVICE_ENDPOINT,
    'qs': { 'wsdl': '' },
    'headers': LMS_HEADERS,
    'body': lmsSoapRequest
  };
  LOGGER.log('CALL LMS WEBSERVICE START');
  request(requestOptions, function (error, response) {
    if (error) {
      if (error.code === 'ETIMEDOUT') {
        LOGGER.log('RETRYING');
        return lmsIntegration(webhookData);
      } else {
        LOGGER.log('WEBSERVICE RESPONSE ERROR');
        LOGGER.log(error);
      }
    } else {
      LOGGER.log('WEBSERVICE RESPONSE');
      LOGGER.log(response.body);
    }
    LOGGER.log('CALL LMS WEBSERVICE END');
  });
};

module.exports = { lmsIntegration };
