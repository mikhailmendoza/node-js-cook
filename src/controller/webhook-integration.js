'use strict';

const forge = require('node-forge');

const LMS_INTEGRATION = require('./lms-integration');
const HELPER = require('../helper');

const { LOGGER } = HELPER;

var webhookIntegration = function (req, res) {
  var headerHmacSignature = req.get('X-Classmarker-Hmac-Sha256');
  var jsonData = req.body;
  // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
  var secret = 'YOUR SECRET PHRASE';
  var verified = verifyData(jsonData, headerHmacSignature, secret);
  if (verified) {
    LOGGER.log('WEBHOOK DATA: ' + JSON.stringify(jsonData));
    // Call to LMS Webservice delay 2 secs to avoid webhook Inactive
    setTimeout(() => {
      LMS_INTEGRATION.lmsIntegration(jsonData);
    }, 2000);
    res.sendStatus(200);
    // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
  } else {
    res.sendStatus(400);
  }
};

var verifyData = function (jsonData, headerHmacSignature, secret) {
  var jsonHmac = computeHmac(jsonData, secret);
  return jsonHmac == headerHmacSignature;
};

var computeHmac = function (jsonData, secret) {
  var hmac = forge.hmac.create();
  hmac.start('sha256', secret);
  var jsonString = JSON.stringify(jsonData);
  var jsonBytes = Buffer.from(jsonString, 'ascii');
  hmac.update(jsonBytes);
  return forge.util.encode64(hmac.digest().bytes());
};

module.exports = { webhookIntegration };
