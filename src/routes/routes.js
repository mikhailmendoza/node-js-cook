'use strict';

const express = require('express');
const router = express.Router();
const url = require('url');

const controller = require('../controller');
const { lms, start, webhook } = controller;

const helper = require('../helper');
const { logger } = helper;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.log(`=============== INVOKE: ${url.parse(req.url).pathname} ENDPOINT ===============`);
  next();
});
// define the home page route
router.get('/start', start.startApp);
router.post('/cook-childrens/webhook', webhook.webhookMainLogic);
router.post('/launchLmsTest', lms.launchExam);

module.exports = router;
