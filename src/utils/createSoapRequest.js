'use strict';

const moment = require('moment');

const xmlModel = require('../models/model');
const math_utils = require('./math-utils');

function convertWebhookToXML(request) {
    var user_course = request.result.cm_user_id.split("_");
    var user_id = user_course[0];
    var course_id = user_course[1];
    xmlModel.UpdateUserTranscript.User.Id = user_id;
    xmlModel.UpdateUserTranscript.Course.Id = course_id;
    xmlModel.UpdateUserTranscript.Course.IsAutoCreated = 0;
    xmlModel.UpdateUserTranscript.Event.Id = request.test.test_id;
    xmlModel.UpdateUserTranscript.Event.Name = request.test.test_name;
    xmlModel.UpdateUserTranscript.Event.IsAutoCreated = 1;
    xmlModel.UpdateUserTranscript.Score.Scored = moment.unix(request.result.time_finished).format("YYYY-MM-DD");
    xmlModel.UpdateUserTranscript.Score.ScoreType = 3;
    xmlModel.UpdateUserTranscript.Score.Score = request.result.points_scored;
    xmlModel.UpdateUserTranscript.Score.PassGrade = math_utils.percentage(request.result.points_available, request.result.percentage_passmark);
    xmlModel.UpdateUserTranscript.Score.IsPassed = (request.result.passed ? 1 : 0);
    var data = objectToXml(xmlModel);
    return data;
}

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

function createSoapRequest(request) {
    var data = convertWebhookToXML(request);
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
                         ${data} 
                    </UpdateUserTranscript>
                    ]]>
                </vuep:sourceXml>
                </vuep:UpdateUserTranscript>
            </soapenv:Body>
        </soapenv:Envelope>
    `;
    return createSoapRequest;
}

module.exports = { createSoapRequest };