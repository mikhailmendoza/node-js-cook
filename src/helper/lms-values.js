'use strict';

const lms_username = 'CookChStagingWS';
const lms_password = 'pz5Yl8xM';
const lms_soap_action = 'http://vuepoint.com/UpdateUserTranscript';

const lms_header = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic ' + Buffer.from(lms_username + ':' + lms_password).toString('base64'),
    'SOAPAction': lms_soap_action,
    'Connection': 'Keep-Alive',
};
const lms_webservice_endpoint = 'https://cookchildrensstaging.certpointstaging.com/wa/ws/ver5/vlsadmin.asmx';

module.exports = { lms_header, lms_webservice_endpoint };
