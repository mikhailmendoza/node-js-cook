'use strict'
const WEBHOOK_API = require('../core/post-functions/webhook');



function startApp(req, res) {
    console.log('Connected Successfuly');
    return res.json('Connected Successfully');
};


function webhook(req, res) {
    res = WEBHOOK_API.webhook(req, res);
    return res;
}


module.exports = {
    webhook,
    startApp
};