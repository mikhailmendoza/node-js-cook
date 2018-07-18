'use strict';

const LMS_HEADERS = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic ' + new Buffer('cookchildrensstaging\\icsadmin' + ':' + 'icsadmin').toString('base64'),
    'SOAPAction': 'http://vuepoint.com/IUserManagement/UpdateUserTranscript',
    'Connection': 'Keep-Alive'
};
const CLASSMAKER_URL = 'https://www.classmarker.com/online-test/start/?';

module.exports = { LMS_HEADERS, CLASSMAKER_URL };
