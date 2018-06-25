var forge = require('node-forge');
var url = require('url');

var logger = require('../../../config/logger-config').Logger;
var validator = require('../../utils/validation');

var webhook = function (req, res) {

    const newLocal = "X-Classmarker-Hmac-Sha256"; 

    var headerHmacSignature = req.get(newLocal);
    var jsonData = req.body;
    // You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok. declare in environment variable
    var secret = 'OuKtbnh9nm2Bev7';

    var verified = verifyData(jsonData,headerHmacSignature,secret);

     
    var verified = verifyData(jsonData, headerHmacSignature, secret);

    if (verified) {
        // Sa‌vе rеsu‌lts in your databasе.
        // Important: Do not use a script that will take a long timе to respond.
          // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
        res.sendStatus(200);
    }
    else {
        res.sendStatus(500)
    }
    console.log(res);
    logger.info(`Response: StatusCode:${res.statusCode} StatusMessage:${res.statusMessage}`)
    logger.info(`End Access for: ${url.parse(req.url).pathname}`);
    logger.info('===============================================');
}

var verifyData = function (jsonData, headerHmacSignature, secret) {
    var jsonHmac = computeHmac(jsonData, secret);
    return jsonHmac == headerHmacSignature;
    // return jsonHmac !== headerHmacSignature;
};

var computeHmac = function (jsonData, secret) {
    var hmac = forge.hmac.create();
    hmac.start('sha256', secret);
    var jsonString = JSON.stringify(jsonData);
    var jsonBytes = new Buffer(jsonString, 'ascii');
    hmac.update(jsonBytes);
    return forge.util.encode64(hmac.digest().bytes());
};

module.exports = { webhook };