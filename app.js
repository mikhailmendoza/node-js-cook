'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const helper = require('./src/helper');

const { LOGGER } = helper;
const PORT = process.env.PORT || 80;

var app = express();

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));


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
