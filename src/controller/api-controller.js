'use strict'
var opn = require('opn'),
    _ = require('lodash'),
    http = require('http');

var convertToXml = require('../utils/convertToXml'),
    formatter = require("../utils/url-formatter");

const CLASSMARKER_URL = 'https://www.classmarker.com/online-test/start/?',
    WEBHOOK_API = require('../core/webhook');

function startApp(req, res) {
    return res.json('Connected Successfully');
};

function webhook(req, res) {
    res = WEBHOOK_API.webhook(req, res);
    return res;
}

function launchLmsTest(req, res) {
    var queryString;
    if (req.method === 'GET') {
        queryString = formatter.urlParameters(req.query);
    } else if (req.method === 'POST') {
        queryString = formatter.urlParameters(req.body);
    }
    console.log(`${CLASSMARKER_URL}${queryString}`);
    opn(`${CLASSMARKER_URL}${queryString}`);

    res.sendStatus(200);
    return res;
}




module.exports = {
    startApp,
    webhook,
    launchLmsTest
};