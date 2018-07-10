'use strict';

const forge = require('node-forge');

var verifyData = function (jsonData, headerHmacSignature, secret) {
    var jsonHmac = computeHmac(jsonData, secret);
    return jsonHmac == headerHmacSignature;
};

var computeHmac = function (jsonData, secret) {
    var hmac = forge.hmac.create();
    hmac.start('sha256', secret);
    var jsonString = JSON.stringify(jsonData);
    var jsonBytes = new Buffer(jsonString, 'ascii');
    hmac.update(jsonBytes);
    return forge.util.encode64(hmac.digest().bytes());
};

module.exports = { verifyData};