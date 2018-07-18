
const moment = require('moment');

const model = require('../models');

const { updUserTrascript } = model;

var webhookToUpdUserTranscriptReq = function (request) {
    var user_course = request.result.cm_user_id.split("_");
    var user_id = user_course[0];
    var course_id = user_course[1];
    updUserTrascript.UpdateUserTranscript.User.Id = user_id;
    updUserTrascript.UpdateUserTranscript.Course.Id = course_id;
    updUserTrascript.UpdateUserTranscript.Course.IsAutoCreated = 0;
    updUserTrascript.UpdateUserTranscript.Event.Id = 0;
    updUserTrascript.UpdateUserTranscript.Event.Name = 'Online Event';
    updUserTrascript.UpdateUserTranscript.Event.IsAutoCreated = 1;
    updUserTrascript.UpdateUserTranscript.Event.Type = 2;
    updUserTrascript.UpdateUserTranscript.Score.Scored = moment.unix(request.result.time_finished).format('YYYY-MM-DD');
    updUserTrascript.UpdateUserTranscript.Score.ScoreType = 3;
    updUserTrascript.UpdateUserTranscript.Score.Score = request.result.percentage;
    updUserTrascript.UpdateUserTranscript.Score.PassGrade = request.result.percentage_passmark;
    updUserTrascript.UpdateUserTranscript.Score.IsPassed = (request.result.passed ? 1 : 0);
    return updUserTrascript;
}

module.exports = { webhookToUpdUserTranscriptReq };