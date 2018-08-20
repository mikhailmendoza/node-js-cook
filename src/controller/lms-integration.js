'use strict';

const request = require('request');
const jsonxml = require('jsontoxml');

const MODEL_SETTER = require('../soap-req-model-setters');
const HELPER = require('../helper');
const UTILS = require('../utils');

const { CREATE_SOAP_REQUEST } = UTILS;
const { UPD_USER_TRANSCRIPT } = MODEL_SETTER;
const { LOGGER, LMS_VALUES, LOGGER_CODES, HTTP_METHOD } = HELPER;

var lmsIntegration = function (webhookData) {
  LOGGER.log(LOGGER_CODES.lms_01);
  var webhookResponse = UPD_USER_TRANSCRIPT.webhookToUpdUserTranscriptReq(webhookData);
  var xmlData = jsonxml(webhookResponse);
  var lms_soap_request = CREATE_SOAP_REQUEST.createUpdateUserTranscriptReq(xmlData);
  LOGGER.log(lms_soap_request);
  LOGGER.log(LOGGER_CODES.lms_02);

  var requestOptions = {
    'method': HTTP_METHOD.post_method,
    'url': LMS_VALUES.lms_webservice_endpoint,
    'qs': { 'wsdl': '' },
    'headers': LMS_VALUES.lms_header,
    'body': lms_soap_request
  };
  LOGGER.log(LOGGER_CODES.ws_resp_start);
  request(requestOptions, function (error, response) {
    if (error) {
      if (error.code === LOGGER_CODES.ws_etimedout) {
        LOGGER.log(LOGGER_CODES.ws_retry);
        return lmsIntegration(webhookData);
      } else {
        LOGGER.log(LOGGER_CODES.ws_resp_error);
        LOGGER.log(error);
      }
    } else {
      LOGGER.log(LOGGER_CODES.ws_resp_success);
      LOGGER.log(response.body);
    }
    LOGGER.log(LOGGER_CODES.ws_resp_finished);
  });
};

module.exports = { lmsIntegration };
