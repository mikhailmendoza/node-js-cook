var express = require('express');
var https = require('https');
var request = require('request');

const POST_URL = 'http://lmsservices.certpointstaging.com/LmsAdmin/LMSAdmin.svc';
// const POST_URL = 'http://lmswebservicesqa.certpointstaging.com/LmsAdmin/LMSAdmin.svc';

var routeToLms = function (postData) {
    var auth = "Basic " +  new Buffer("cookchildrensstaging\\icsadmin" + ":" + "iscadmin").toString("base64");
    var auth1 =auth;
    console.log(auth1);
   
    
    // prepare the header
    var postheaders = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'Authorization': 'Basic Y29va2NoaWxkcmVuc3N0YWdpbmcvaWNzYWRtaW46aWNzYWRtaW4=',                         
        'SOAPAction': 'http://vuepoint.com/IUserManagement/UpdateUserTranscript',
        'Connection': 'Keep-Alive'


    };

    console.log('===============request==================');
    var reqt =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:vuep="http://vuepoint.com/">
    <soapenv:Header/>
    <soapenv:Body>
      <vuep:UpdateUserTranscript>
          <!--Optional:-->
          <vuep:sourceXml>
           <![CDATA[         
          <UpdateUserTranscript>
            ${postData} 
    </UpdateUserTranscript>
          ]]>
          </vuep:sourceXml>
       </vuep:UpdateUserTranscript>
    </soapenv:Body>
 </soapenv:Envelope>
 `

    console.log(reqt);
    console.log('===============request==================');
    // the post options
    var optionspost = {
        method: 'POST',
        headers: postheaders,
        host: 'lmsservices.certpointstaging.com'
    };

    var requestOptions = {
        'method': 'POST',
        'url': POST_URL,
        'qs': { 'wsdl': '' },
        'headers': postheaders,
        'body': reqt,
    };

    request(requestOptions, function (error, response, body) {

        if (error) {
            console.log('===============ws error==================');
            console.log(error)
            console.log('===============ws error==================');
        } else {
            console.log('===============ws resonse==================');
            console.log(response.body);
            console.log('===============ws resonse==================');
        }
    })

    // soapOptions = async () => {
    //     const location = window.location.hostname;

    //     const  { response }  = await fetch(POST_URL, optionspost);
    //     console.log(response);
    // }
    // var soapOptions = {
    //         uri: 'http://lmsservices.certpointstaging.com/LmsAdmin/LMSAdmin.svc',
    //         headers: {
    //             'Content-Type': 'text/xml; charset=utf-8',
    //             'Authorization': auth,
    //             'SOAPAction': 'http://vuepoint.com/IUserManagement/UpdateUserTranscript',
    //             'Connection': 'keep-alive'
    //         },
    //         method: 'POST',
    //         body: reqt //New order is properly formed xml as a String
    //     }

    //         (async () => {
    //             const { response } = await soapRequest(uri, soapOptions.headers, reqt);
    //             const { body, statusCode } = response;
    //             console.log(response);
    //             console.log(body);
    //             console.log(statusCode);
    //         })();
    // setTimeout(() => {


    //     var reqPost = https.request(optionspost, function(res) {
    //         // res.setType('text/xml; charset=utf-8');
    //         console.log("statusCode: ", res.statusCode);

    //         // uncomment it for header details
    //     //  console.log("headers: ", res.headers);

    //         res.on('data', function(d) {
    //             var xmldata = d
    //             parseString(xmldata, function (err, result) {
    //                 console.log (xmldata)
    //                });
    //             // console.info('POST result:\n',d);
    //             process.stdout.write(d);
    //             console.info('\n\nPOST completed');
    //         });
    //     });
    // }, 5000);

    // // write the json data
    // reqPost.write(reqt);
    // reqPost.end();
    // reqPost.on('error', function(e) {
    //     console.error(e);
    // });
    // var url = path.join(__dirname, '..', '..', 'LMSAdmin.wsdl');
    // var args = postData;
    // soap.createClient(url, function (err, client) {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         // client.setEndpoint('http://lmsservices.certpointstaging.com/LmsAdmin/LMSAdmin.svc');
    //         client.UpdateUserTranscript(reqt, function (err, response) {
    //             if (err) {
    //                 console.error(err);
    //             } else {
    //                 console.log(response);
    //                 res.send(response);
    //             }
    //         });
    //     }
    // });


};

module.exports = { routeToLms };