const express = require('express');
const router = express.Router();
const url = require('url');

const controller = require('../controller');
const helper = require('../helper');

const { logger } = helper;
const { lms, start, webhook } = controller;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    logger.log(`=============== Started Access for: ${url.parse(req.url).pathname} ===============`);
    next();
});
// define the home page route
router.get('/start', start.startApp);
router.post('/cook-childrens/webhook', webhook.webhookMainLogic);
router.post('/launchLmsTest', lms.launchExam);

module.exports = router;
