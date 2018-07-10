const bodyParser = require('body-parser'),
  forge = require('node-forge'),
  express = require('express'),
  request = require('request'),
  _ = require('lodash'),
  cron = require("node-cron"),
  moment = require("moment"),
  fs = require("fs");


var soapRequest = require('./src/utils/createSoapRequest'),
  formatter = require('./src/utils/url-formatter'),
  logger = require('./config/logger-config').Logger,
  config = require('./config/config-file');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/start', (req, res) => {
  res.json('Connected Successfully');
});

app.post('/webhook', function (req, res) {
  var headerHmacSignature = req.get("X-Classmarker-Hmac-Sha256");
  var jsonData = req.body;
  // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
  // TESTING ONLY ADDED SECRET PHRASE ENVIRONMENT VARIABLE;
  var secret = process.env.COURSE1_SECRET_PHRASE;
  var verified = verifyData(jsonData, headerHmacSignature, secret);
  if (verified) {
    // Sa‌vе rеsu‌lts in your databasе.
    // Important: Do not use a script that will take a long timе to respond.
    routeToLms(req.body);
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
  // TODO CHANGE ONCE THERE IS A SECRET PHRASE
  var secret = 'H9f6x7RYz9KPvb1';
  var verified = verifyData(jsonData, headerHmacSignature, secret);

  if (verified) {
    // Sa‌vе rеsu‌lts in your databasе.
    // Important: Do not use a script that will take a long timе to respond.
    routeToLms(req.body);
    // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
    res.sendStatus(200);
  }
  else {
    res.sendStatus(400);
  }
});


app.post('/launchLmsTest', function (req, res) {
  var queryString;
  queryString = formatter.urlParameters(req.body);
  res.json(`${config.TEST_URL}${queryString}`);
  return res;
});

var verifyData = function (jsonData, headerHmacSignature, secret) {
  var jsonHmac = computeHmac(jsonData, secret);
  return jsonHmac == headerHmacSignature;
};

var computeHmac = function (jsonData, secret) {
  var hmac = forge.hmac.create();
  hmac.start('sha256', secret);
  var jsonString = JSON.stringify(jsonData);
  var jsonBytes = new Buffer(jsonString, 'ascii');
  hmac.update(jsonBytes);
  return forge.util.encode64(hmac.digest().bytes());
};

var routeToLms = function (postData) {
  logger.info('=============Start Request==================');
  var wsRequest = soapRequest.createSoapRequest(postData);
  logger.info(wsRequest);
  logger.info('=============End Request===================');

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
      logger.info('===============ws error====================');
      logger.info(error);
      logger.info('===============ws error====================');
    } else {
      logger.info('===============ws resonse==================');
      logger.info(response.body);
      logger.info('===============ws resonse==================');
    }
    logger.info('=============Call LMS WS END=================');
  });
  //}, 600000);
};

// schedule job to compress log file run every midnight
cron.schedule("* * * * * *", function () {
  logger.compressLogFiles();
  logger.info("running a task every minute");
});

app.listen(process.env.PORT, function () {
  logger.info('Running in PORT:' + process.env.PORT);
});
