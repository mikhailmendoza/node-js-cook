'use strict'

var moment = require('moment'),
    math_utils = require("./math-utils"),
    //  = require("../models/updateUserTranscript"),
    j2xmlparser = require('js2xmlparser');

function convertWebhookToXML(request) {
    var user_course = request.result.cm_user_id.split("_");
    var user_id = user_course[0];
    var course_id = user_course[1];
    var xmlParse = {
    User: {
        Id: { type: String }
    },
    Course: {
        Id: { type: String },
        IsAutoCreated: { type: Number }
    },
    Event: {
        Id: { type: String },
        Name: { type: String },
        IsAutoCreated: { type: Number }
    },
       Score: {
        Scored: { type: String },
        ScoreType: { type: String },
        Score: { type: String },
        PassGrade: { type: String },
        IsPassed: { type: Number }
    }
}
    xmlParse.User.Id = user_id;
    xmlParse.Course.Id = course_id;
    xmlParse.Course.IsAutoCreated = 0;
    xmlParse.Event.Id = request.test.test_id;
    xmlParse.Event.Name = request.test.test_name;
    xmlParse.Event.IsAutoCreated = 1;
    xmlParse.Score.Scored = moment.unix(request.result.time_finished).format("YYYY-MM-DD");
    xmlParse.Score.ScoreType = 3;
    xmlParse.Score.Score = request.result.points_scored;
    xmlParse.Score.PassGrade = math_utils.percentage(request.result.points_available, request.result.percentage_passmark);
    xmlParse.Score.IsPassed = (request.result.passed ? 1 : 0);
    var data = objectToXml(xmlParse);
   

    console.log('xmlParse:',data);
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
    xml+= `<Level><UniqueId/></Level>`
    return xml;
}

module.exports = { convertWebhookToXML };