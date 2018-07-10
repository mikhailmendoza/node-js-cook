'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cron = require("node-cron");
const _ = require('lodash');
const fs = require("fs");
const url = require('url');

const webhook_integration = require('./src/core/webhook-integration');
const lms_instegration = require('./src/core/lms-integration');
const url_formatter = require('./src/utils/url-formatter');
const logger = require('./config/logger-config').Logger
const config = require('./config/config-file');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function timeLog(req, res, next) {
  logger.log('===============================================');
  logger.log(`Start Access for: ${url.parse(req.url).pathname}`);
  next();
  logger.log(`Finished Access for: ${url.parse(req.url).pathname}`);
});

app.get('/start', (req, res) => {
  res.json('Connected Successfully');
});

app.post('/webhook', function (req, res) {
  var headerHmacSignature = req.get("X-Classmarker-Hmac-Sha256");
  var jsonData = req.body;
  // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
  var secret = process.env.COURSE1_SECRET_PHRASE;
  var verified = webhook_integration.verifyData(jsonData, headerHmacSignature, secret);
  if (verified) {
    // Sa‌vе rеsu‌lts in your databasе. Important: Do not use a script that will take a long timе to respond.
    setTimeout(() => {
      lms_instegration.routeToLms(jsonData);
    }, 10000);
    // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});

app.post('/cook-childrens/webhook', function (req, res) {
  var headerHmacSignature = req.get("X-Classmarker-Hmac-Sha256");
  var jsonData = req.body;
  // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
  var secret = 'H9f6x7RYz9KPvb1';
  var verified = webhook_integration.verifyData(jsonData, headerHmacSignature, secret);
  if (verified) {
    // Sa‌vе rеsu‌lts in your databasе. Important: Do not use a script that will take a long timе to respond.
    setTimeout(() => {
      lms_instegration.routeToLms(jsonData);
    }, 10000);
    res.sendStatus(200);
    // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
  }
  else {
    res.sendStatus(400);
  }
});

app.post('/launchLmsTest', function (req, res) {
  var queryString;
  queryString = url_formatter.urlParameters(req.body);
  res.redirect(`${config.CLASSMAKER_URL}${queryString}`);
});

// schedule job to compress log file run every midnight
cron.schedule("0 0 0 * * *", function () {
  logger.log("run every midnight");
  logger.compressLogFiles();
});

app.listen(process.env.PORT, function () {
  logger.log('Running in PORT:' + process.env.PORT);
});
