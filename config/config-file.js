'use strict';

const LMS_HEADERS = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic ' + new Buffer(process.env.API_USERNAME + ':' + process.env.API_PASSWORD).toString('base64'),
    'SOAPAction': process.env.SOAP_ACTION,
    'Connection': 'Keep-Alive'
};
const TEST_URL = 'https://www.classmarker.com/online-test/start/?';

module.exports = { LMS_HEADERS, TEST_URL };