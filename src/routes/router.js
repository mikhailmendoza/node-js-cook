'use strict';

var express = require('express'),
    router = express.Router(),
    url = require('url');

var controller = require('../controller/api-controller');

router.use(function timeLog(req, res, next) {
    console.log('===============================================');
    console.log(`Start Access for: ${url.parse(req.url).pathname}`);
    next();
});

// define the page route 
router.get('/start', controller.startApp);
router.post('/webhook', controller.webhook);
router.get('/launchLmsTest', controller.launchLmsTest);
router.post('/launchLmsTest', controller.launchLmsTest);
router.post('/updateUserTest', controller.launchLmsTest);




module.exports = router;