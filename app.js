const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  forge = require('node-forge'),
  request = require('request'),

  url = require('url'),
  _ = require('lodash');

var lms = require('./src/core/soapClient');
var convertToXml = require('./src/utils/convertToXml');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
var controller = require('./src/controller/api-controller');



app.get('/start', (req, res) => {
  res.json('Connected Successfully');
});
app.post('/webhook', controller.webhook);
app.get('/launchLmsTest', controller.launchLmsTest);
app.post('/launchLmsTest', controller.launchLmsTest);
app.post('/updateUserTest', controller.launchLmsTest);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
