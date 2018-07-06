const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  forge = require('node-forge'),
  request = require('request');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./src/routes/router');

const API_VERSION_PATH = '/v1';
app.use(API_VERSION_PATH, routes)

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
