'use strict';

const request = require('request');
const jsonxml = require('jsontoxml');

const MODEL_SETTER = require('../soap-req-model-setters');
const HELPER = require('../helper');
const UTILS = require('../utils');

const { UPD_USER_TRANSCRIPT } = MODEL_SETTER;
const { CREATE_SOAP_REQUEST } = UTILS;
const { LOGGER } = HELPER;

const LMS_HEADERS = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + Buffer.from(process.env.LMS_WS_USERNAME + ':' + process.env.LMS_WS_PASSWORD).toString('base64'),
  'SOAPAction': process.env.LMS_SOAP_ACTION,
  'Connection': 'Keep-Alive',
};

var count = 0;

var lmsIntegration = function (webhookData) {
  LOGGER.log('POPULATE LMS WEBSERVICE REQUEST START');
  // Parse Webhook requst to WS JSON Specification
  var webhookResponse = UPD_USER_TRANSCRIPT.webhookToUpdUserTranscriptReq(webhookData);
  // Transform parsed data to XML
  var xmlData = jsonxml(webhookResponse);
  // Create Web service Soap Request
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
        count++;
        LOGGER.log('CONNECTION TIMEDOUT RETRYING ATTEMPT NUMBER:' + count);
        return lmsIntegration(webhookData);
      } else {
        LOGGER.log('WEBSERVICE RESPONSE ERROR');
        LOGGER.log(error);
      }
    } else {
      LOGGER.log('WEBSERVICE RESPONSE');
      LOGGER.log(response.body);
    }
    count = 0;
    LOGGER.log('CALL LMS WEBSERVICE END');
  });
};

module.exports = { lmsIntegration };
