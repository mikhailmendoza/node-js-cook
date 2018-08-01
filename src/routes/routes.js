'use strict';

const express = require('express');
const router = express.Router();
const url = require('url');

const CONTROLLER = require('../controller');
const HELPER = require('../helper');

const { START_APP, WEBHOOK_INTEGRATION, CLASSMAKER_INTEGRATION } = CONTROLLER;
const { LOGGER } = HELPER;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  LOGGER.log('Access:' + url.parse(req.url).pathname);
  next();
});

// API Route to verify if application is running
router.get('/start', START_APP.startApp);
// API Route to Redirect LMS to Classmarker Exam
router.post('/launchLmsTest', CLASSMAKER_INTEGRATION.launchExam);
// API Route for Webhook Integration
router.post('/cook-childrens/webhook', WEBHOOK_INTEGRATION.webhookIntegration);

module.exports = router;
