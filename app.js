// Node.js wеbh‌ooks code еxample by ClassMarker.com


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const forge = require('node-forge');
const request = require('request');

app.use(bodyParser.json()); // for parsing application/json
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});

app.get('/startApp',function (req,res){
  console.log('Connected Successfuly');
    return res.json('Connected Successfully');
});
app.post('/webhook', function (req, res) {

    var headerHmacSignature = req.get("X-Classmarker-Hmac-Sha256");
    var jsonData = req.body;
	// You are given a un‌iquе sеc‌ret code when crеati‌ng a Wеbho‌ok.
	// TODO declare in ENVIRONMENT VARIABLE
    var secret = 'H9f6x7RYz9KPvb1';

    var verified = verifyData(jsonData,headerHmacSignature,secret);

    if(verified){
        // Sa‌vе rеsu‌lts in your databasе.
        // Important: Do not use a script that will take a long timе to respond.
		routeToLms(req , res,'test');
		// TODO declare in ENVIRONMENT VARIABLE
        // Notify ClassMarker you have recеiv‌ed the Wеbh‌ook.
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400)
    }

});

var verifyData = function(jsonData,headerHmacSignature, secret)
{
    var jsonHmac = computeHmac(jsonData, secret);
    console.log(`JSON HMAC: ${jsonHmac}`);
    console.log(`HEADERHMACSIGN: ${headerHmacSignature}`);
    return jsonHmac == headerHmacSignature;
};

var computeHmac = function(jsonData, secret){
    var hmac = forge.hmac.create();
    hmac.start('sha256', secret);
    var jsonString = JSON.stringify(jsonData);
    var jsonBytes = new Buffer(jsonString, 'ascii');
    hmac.update(jsonBytes);
    return forge.util.encode64(hmac.digest().bytes());
};

var routeToLms=function(req, res,urlEndpoint) {
    console.log('Request Body:' + req.body);
    request.post({
        url: urlEndpoint,
        body: req.body
    },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (validator.isJson(body)) {
                    res.json(JSON.parse(body));
                    logger.info('Response:' + body);
                }
            } else {
                res.statusCode = response.statusCode.send(error);
                logger.error(error);
            }
            console.log(`End Access for: ${url.parse(req.url).pathname}`);
			console.log('===============================================');
        });
}
