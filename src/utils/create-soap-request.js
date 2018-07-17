'use strict';

const moment = require('moment');


function objectToXml(obj) {
    var xml = '';
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        if (obj[prop] == undefined)
            continue;
        xml += "<" + prop + "> ";
        if (typeof obj[prop] == "object")
            xml += objectToXml(new Object(obj[prop]));
        else
            xml += obj[prop];
        xml += "</" + prop + ">";
    }
    return xml;
}

function createUpdateUserTranscriptReq(request) {
    var createSoapRequest =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vuep="http://vuepoint.com/">
            <soapenv:Header/>
            <soapenv:Body>
                <vuep:UpdateUserTranscript>
                <!--Optional:-->
                <vuep:sourceXml>
                    <![CDATA[         
                    <UpdateUserTranscript>
                        <Level>
                            <UniqueId/>
                        </Level>
                         ${request} 
                    </UpdateUserTranscript>
                    ]]>
                </vuep:sourceXml>
                </vuep:UpdateUserTranscript>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
    return createSoapRequest;
}

module.exports = { createUpdateUserTranscriptReq, objectToXml };