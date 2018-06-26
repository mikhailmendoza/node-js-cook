
'use strict';

// [START app]
const express = require('express');
const app = express();
const moment = require("moment");
const url = require('url');
const bodyParser = require('body-parser');

const controller= require('./src/controller/endpoint-controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.use(function timeLog(req, res, next) {
	console.log('===============================================');
	console.log(`Start Access for: ${url.parse(req.url).pathname}`);
	next();
});
app.get('/start', controller.startApp);

app.post('/webhook', controller.webhook);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`App listening on port ${PORT}`);
 console.log('Press Ctrl+C to quit.');
});


