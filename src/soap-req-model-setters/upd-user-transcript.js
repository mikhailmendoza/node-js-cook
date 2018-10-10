
'use strict';

const moment = require('moment');

const model = require('../models');

const HELPER = require('../helper');
const { LOGGER } = HELPER;

const { UPD_USER_TRANSCRIPT } = model;

var webhookToUpdUserTranscriptReq = function (request) {
 LOGGER.log('Convet Webhook to Update User Trascript Request');
  LOGGER.log('Get cm_user_id:' + request.result.cm_user_id);
  var userCourse = request.result.cm_user_id.split('_');
  var userId = userCourse[0];
  var courseId = userCourse[1];
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.User.Id = userId;
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Course.Id = courseId;
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Course.IsAutoCreated = 0;
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Event.Id = 0;
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Event.Name = 'Online Event';
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Event.IsAutoCreated = 1;
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Event.Type = 2;
  LOGGER.log('Get time_finished:' + request.result.time_finished);
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Score.Scored = moment.unix(request.result.time_finished).format('YYYY-MM-DD HH:mm:ss');
LOGGER.log('Get percentage_passmark:' + request.result.percentage_passmark);
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Score.ScoreType = (request.result.percentage_passmark <= 0 ? 1 : 3);
LOGGER.log('Get percentage' + request.result.percentage);
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Score.Score = (request.result.percentage == 0 ? 1 : Math.round(request.result.percentage));
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Score.PassGrade = request.result.percentage_passmark;
LOGGER.log('Get percentage' + request.result.passed);
  UPD_USER_TRANSCRIPT.UpdateUserTranscript.Score.IsPassed = (request.result.passed ? 1 : 0);
  return UPD_USER_TRANSCRIPT;
};

module.exports = { webhookToUpdUserTranscriptReq };
