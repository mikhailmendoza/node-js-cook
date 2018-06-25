'use strict'
const GET_RECENT_RESULTS = require('../core/get-functions/getRecentResults'),
    GET_MOCK = require('../core/get-functions/getRecentResultsMock'),
    GET_RESULTS = require('../core/get-functions/getResults'),
    ADD_CLASS_MARK = require('../core/post-functions/addClassMark'),
    WEBHOOK_API = require('../core/post-functions/webhook');



function startApp(req, res) {
    return res.json('Connected Successfully');
};

function getResults(req, res) {
    res = GET_RESULTS.getResults(req, res);
    return res;
}

function getRecentResults(req, res) {
    res = GET_RECENT_RESULTS.getRecentResults(req, res);
    return res;
}

function getRecentResultMock(req, res) {
    res = GET_MOCK.getMockResponse(req, res);
    return res;
};

function addClassMarkRecord(req, res) {
    res = ADD_CLASS_MARK.addClassMarkRecord(req, res);
    return res;
}

function dynamicUrl(req, res) {
    res = DYNAMIC_URL.dynamicUrl(req, res);
    return res;
}

function webhook(req, res) {
    res = WEBHOOK_API.webhook(req, res);
    return res;
}


module.exports = {
    startApp,
    getResults,
    getRecentResults,
    getRecentResultMock,
    addClassMarkRecord,
    dynamicUrl,
    webhook
};