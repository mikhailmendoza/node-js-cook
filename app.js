'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const helper = require('./src/helper');

const { LOGGER } = helper;
const PORT = process.env.PORT || 80;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./src/routes/routes');

app.use('', routes);

// Cron job to compress log files runs every 12 am
cron.schedule('0 0 0 * * *', function () {
  LOGGER.log('RUNNING CRON JOB');
  LOGGER.checkLogFiles();
});

app.listen(PORT, function () {
  LOGGER.log('Running in PORT:' + PORT);
  LOGGER.checkLogFiles();
});
