
'use strict';

// [START app]
const express = require('express');

const app = express();
const cron = require("node-cron");
const moment = require("moment");
const fs = require("fs");
const url = require('url');
const bodyParser = require('body-parser');

const controller= require('./src/controller/endpoint-controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = require('./config/logger-config').Logger


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.use(function timeLog(req, res, next) {
	logger.info('===============================================');
	logger.info(`Start Access for: ${url.parse(req.url).pathname}`);
	next();
});
app.get('/start', controller.startApp);

app.get('/getResults', controller.getResults);
app.get('/groups/recent_results', controller.getRecentResults);
app.get('/getRecentResultMock', controller.getRecentResultMock);
app.post('/postAPI/accesslist/:accesslist', controller.addClassMarkRecord);
app.post('/webhook', controller.webhook);
app.post('/dynamicUrl', controller.dynamicUrl);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info('Press Ctrl+C to quit.');
});

// schedule job to compress log file run every midnight
cron.schedule("0 0 0 * * *", function () {
  logger.compressLogFiles();
  console.log("running a task every minute");
});

