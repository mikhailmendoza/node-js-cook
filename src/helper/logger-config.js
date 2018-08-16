'use strict';

const moment = require('moment');
const walk = require('walk');
const zlib = require('zlib');
const fs = require('fs');

const YEAR_DATE_FORMAT = moment().format('YYYY-MM-DD');
const LOG_FILE_NAME = 'logs_' + YEAR_DATE_FORMAT + '.txt';
const ARCHIVE_FILE_DIR = 'archive/';
const GZIP = zlib.createGzip();
const LOG_FILE_DIR = 'logs/';
const UTF8_FORMAT = 'utf8';

var Logger = exports.Logger = {};

var logStream;

// CREATE LOG FILE DIR
if (!fs.existsSync(LOG_FILE_DIR)) {
  fs.mkdirSync(LOG_FILE_DIR);
}

// CREATE LOG FILE
Logger.log = function (msg) {
  var DATE_TIME_FORMAT = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  var message = DATE_TIME_FORMAT + ':' + msg + '\n';
  if (fs.existsSync(LOG_FILE_DIR + LOG_FILE_NAME)) {
    fs.appendFileSync(LOG_FILE_DIR + LOG_FILE_NAME, message, UTF8_FORMAT);
  } else {
    logStream = fs.createWriteStream(LOG_FILE_DIR + LOG_FILE_NAME);
    logStream.write(message);
  }
};

Logger.checkLogFiles = function () {
  // Iterate over the files located in logs directory
  var walker = walk.walk(LOG_FILE_DIR, { followLinks: false });
  walker.on('file', function (root, stat, next) {
    // remove logs_ and .txt in the fileName
    var fileName = stat.name.substring('logs_'.length);
    fileName = fileName.slice(0, fileName.lastIndexOf('.'));
    var logFileDate = moment(fileName, 'YYYY-MM-DD');
    // compress all previously created log file
    if (logFileDate.isBefore(moment().format('YYYY-MM-DD'))) {
      compressLogFiles(fileName);
    }
    next();
  });
};

// COMPRESS ALL LOG FILE AND MOVE IT TO logs/archive DIR
var compressLogFiles = function (logFileDate) {
  var fileName = 'logs_' + logFileDate + '.txt';
  if (fs.existsSync(LOG_FILE_DIR + fileName)) {
    if (!fs.existsSync(LOG_FILE_DIR + ARCHIVE_FILE_DIR)) {
      fs.mkdirSync(LOG_FILE_DIR + ARCHIVE_FILE_DIR);
    }
    const input = fs.createReadStream(LOG_FILE_DIR + fileName);
    const output = fs.createWriteStream(LOG_FILE_DIR + ARCHIVE_FILE_DIR + fileName + '.gz');
    input.pipe(GZIP).pipe(output);
    fs.unlinkSync(LOG_FILE_DIR + fileName);
  }
};
