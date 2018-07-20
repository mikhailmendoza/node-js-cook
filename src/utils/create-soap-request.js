'use strict';

function createUpdateUserTranscriptReq (request) {
  var createSoapRequest =
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vuep="http://vuepoint.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <vuep:UpdateUserTranscript>
          <!--Optional:-->
          <vuep:sourceXml>
            <![CDATA[         
              <UpdateUserTranscript>
                ${request} 
              </UpdateUserTranscript>
            ]]>
          </vuep:sourceXml>
        </vuep:UpdateUserTranscript>
      </soapenv:Body>
    </soapenv:Envelope>`;
  return createSoapRequest;
}

module.exports = { createUpdateUserTranscriptReq };
