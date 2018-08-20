'use strict';

const lms_01 = 'POPULATE LMS WEBSERVICE REQUEST START';
const lms_02 = 'POPULATE LMS WEBSERVICE REQUEST END';

const ws_resp_start = 'CALL LMS WEBSERVICE START';
const ws_etimedout = 'ETIMEDOUT';
const ws_retry = 'RETRYING';
const ws_resp_error = 'WEBSERVICE RESPONSE ERROR';
const ws_resp_success = 'WEBSERVICE RESPONSE';
const ws_resp_finished = 'CALL LMS WEBSERVICE END';

const webhook_request = 'WEBHOOK DATA: ';

module.exports = {
    lms_01,
    lms_02,
    ws_resp_start,
    ws_etimedout,
    ws_retry,
    ws_resp_error,
    ws_resp_success,
    ws_resp_finished,
    webhook_request
};
