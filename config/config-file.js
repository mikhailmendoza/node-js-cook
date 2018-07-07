'use strict'

var postheaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Authorization': 'Basic Y29va2NoaWxkcmVuc3N0YWdpbmcvaWNzYWRtaW46aWNzYWRtaW4=',
    'SOAPAction': 'http://vuepoint.com/IUserManagement/UpdateUserTranscript',
    'Connection': 'Keep-Alive'
};



const POST_URL = 'http://lmsservices.certpointstaging.com/LmsAdmin/LMSAdmin.svc',
    POST_METHOD = 'POST',
    HOST = 'lmsservices.certpointstaging.com';

module.exports = { postheaders, POST_URL, POST_METHOD };