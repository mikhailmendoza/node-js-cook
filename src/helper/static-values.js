'use strict';

const LMS_HEADERS = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'Authorization': 'Basic ' + Buffer.from(process.env.LMS_USERNAME + ':' + process.env.LMS_PASSWORD).toString('base64'),
  'SOAPAction': process.env.LMS_SOAP_ACTION,
  'Connection': 'Keep-Alive'
};
const CLASSMAKER_URL = 'https://www.classmarker.com/online-test/start/?';

module.exports = { LMS_HEADERS, CLASSMAKER_URL };
