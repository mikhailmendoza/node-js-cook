var express = require('express');
var router = express.Router();
var url = require("url");

var core = require('../controller')

const helper = require('../helper');
const { constants, logger } = helper;

const {
    lms,
    start,
    webhook
} = core;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    logger.log('Started Access for:' + url.parse(req.url).pathname);
    next();
})
// define the home page route
router.get("/start", start.startApp);
router.post("/cook-childrens/webhook", webhook.webhookMainLogic);
router.post("/launchLmsTest", lms.launchExam);


module.exports = router