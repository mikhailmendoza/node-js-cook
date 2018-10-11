'use strict';

const forge = require('node-forge');

const LMS_INTEGRATION = require('./lms-integration');
const HELPER = require('../helper');

const { LOGGER } = HELPER;

var webhookIntegration = function (req, res) {
  var headerHmacSignature = req.get('X-Classmarker-Hmac-Sha256');
  var jsonData = req.body;
 /* Log Node Parsed Body */
   LOGGER.log("Node Parsed Body:\n" + JSON.stringify(jsonData));
   /* Log Node Parsed Body */
 LOGGER.log("Raw Body:\n" + req.rawBody);
LOGGER.log('HeaderHmacSignature:' + headerHmacSignature);
  // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
  var secret = 'DvIwWXh3I31FUwQ';
  var verified = verifyData(req.rawBody, headerHmacSignature, secret);
  if (verified) {
    LOGGER.log('WEBHOOK DATA: ' + JSON.stringify(jsonData));
    // Sa‌vе rеsu‌lts in your databasе. Important: Do not use a script that will take a long timе to respond.
    setTimeout(() => {
      LMS_INTEGRATION.lmsIntegration(jsonData);
    }, 2000);
    res.sendStatus(200);
    // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
  } else {
    LOGGER.log('Failed');
	res.sendStatus(400);
  }
};

var verifyData = function (jsonData, headerHmacSignature, secret) {
  var jsonHmac = computeHmac(jsonData, secret);
   LOGGER.log('Sent HmacSignature:     ' + headerHmacSignature);
   LOGGER.log('Computed HmacSignature: ' + jsonHmac);
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
