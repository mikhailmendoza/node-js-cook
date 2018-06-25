'use strict';

var request = require('request');
var url = require('url');

var mockResponse = require('../../mock-response/mockResponse')
var logger = require('../../../config/logger-config').Logger;
var formatter = require('../../utils/url-formatter');
var validator = require('../../utils/validation')

function dynamicUrl(req, res) {
    var url = formatter.setQueryParams(req.url, req);
    var apiResponse = {};
    var postJsonRequest = {
        'testID': req.body.testID,
        'userID': req.body.userID,
        'url': 'https://webhook.site/c742a7f7-711b-46c2-8642-9ffeb31aabb7';
    };
    /* TODO webhook endpoint url
        request.post({
            url: url,
            body: req.body
        },
        */  
        logger.info(`Response: ${JSON.stringify(mockResponse.webHook)}`);
        logger.info(`End Access for: ${url.parse(req.url).pathname}`);
        logger.info('===============================================');
    return res.json((mockResponse.webHook));
    /*
         function (error, response, body) {
         res.statusCode = 200;
         apiResponse.testName= 'sample_test'
         apiResponse.userName= 'JohnDoe';
         apiResponse.score= 100;
         apiResponse.url= postJsonRequest.url;
         apiResponse= JSON.stringify(apiResponse);   
         if (helpers.isJson(mock.mockWebhoo)){
             res.json(JSON.parse(mock.mockWebhook));
         }
        if (!error && response.statusCode === 200) {
    
        if (helpers.isJson(body)) {
            res.json(JSON.parse(body));
        }
        } else {
            res.statusCode = response.statusCode.send(error);
        }
        return res
        */
}

module.exports = { dynamicUrl };