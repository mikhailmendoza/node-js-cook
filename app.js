'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cron = require("node-cron");

const helper = require('./src/helper');
const { constants, logger } = helper;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var routes = require("./src/routes/routes");
app.use('',routes);


app.listen(process.env.PORT, function () {
  logger.log('Running in PORT:' + process.env.PORT);
});