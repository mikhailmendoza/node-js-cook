const bodyParser = require('body-parser'),
  forge = require('node-forge'),
  express = require('express'),
  request = require('request'),
  _ = require('lodash');

var soapRequest = require('./src/utils/createSoapRequest'),
  formatter = require('./src/utils/url-formatter'),
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
  console.log('=============Start Request==================');
  var wsRequest = soapRequest.createSoapRequest(postData);
  console.log(wsRequest);
  console.log('=============End Request===================');

  var requestOptions = {
    'method': 'POST',
    'url': process.env.LMS_WEBSERVICE_ENDPOINT,
    'qs': { 'wsdl': '' },
    'headers': config.LMS_HEADERS,
    'body': wsRequest,
  };
  console.log('=============Call LMS WS Start=============');
  request(requestOptions, function (error, response) {
    // setTimeout(() => {
    if (error) {
      console.log('===============ws error====================');
      console.log(error);
      console.log('===============ws error====================');
    } else {
      console.log('===============ws resonse==================');
      console.log(response.body);
      console.log('===============ws resonse==================');
    }
    console.log('=============Call LMS WS END=================');
  });
  //}, 600000);
};

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
