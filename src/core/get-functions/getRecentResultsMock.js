'use strict';

var request = require('request');
var mockResponse = require('../../../mock-response/mockResponse')

function getMockResponse(req, res) {
    return res.json((mockResponse.getRescentResult));
}

module.exports = { getMockResponse };

