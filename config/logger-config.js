const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const moment = require('moment');
const _ = require('lodash');

const staticValues = require('./static-values')

var Logger = exports.Logger = {};

var logFileDir = staticValues.LOG_DIR;
var archiveFileDir = staticValues.ARCHIVE_DIR;
var yearDate = moment().format(staticValues.YEAR_DATE_FORMAT);
var dateTime = moment().format(staticValues.YEAR_DATE_TIME_FORMAT);
var infoLogFile = `${staticValues.INFO_LOG}_${yearDate}${staticValues.TEXT_FILE_TYPE}`;
var errLogFile = `${staticValues.ERROR_LOG}_${yearDate}${staticValues.TEXT_FILE_TYPE}`;
var debugLogFile = `${staticValues.ERROR_LOG}_${yearDate}${staticValues.TEXT_FILE_TYPE}`;

var infoStream;
var errorStream;
var debugStream;
var fileSize;

// CREATE LOG FILE DIR 
if (!fs.existsSync(logFileDir)) {
  fs.mkdirSync(logFileDir);
}

//CREATE INFO LOG FILE
Logger.info = function (msg) {
  var message = `${dateTime}:${msg}\n`;
  if (fs.existsSync(`${logFileDir}${infoLogFile}`)) {
    fs.appendFileSync(`${logFileDir}${infoLogFile}`, message, staticValues.UTF8);
  } else {
    infoStream = fs.createWriteStream(logFileDir + infoLogFile);
    infoStream.write(message);
  }
}

// CREATE DEBUG LOG FILE
Logger.debug = function (msg) {
  var message = `${dateTime}:${msg}\n`;
  if (fs.existsSync(`${logFileDir}${debugLogFile}`)) {
    fs.appendFileSync(`${logFileDir}${debugLogFile}`, message, staticValues.UTF8);
  } else {
    debugStream = fs.createWriteStream(logFileDir + debugLogFile);
    debugStream.write(message);
  }
};

// CREATE ERROR LOG FILE
Logger.error = function (msg) {
  var message = `${dateTime}:${msg}\n`;
  if (fs.existsSync(`${logFileDir}${errLogFile}`)) {
    fs.appendFileSync(`${logFileDir}${errLogFile}`, message, staticValues.UTF8);
  } else {
    errorStream = fs.createWriteStream(logFileDir + errLogFile);
    errorStream.write(message);
  }
};

// COMPRESS ALL LOG FILE AND MOVE IT TO logs/archive DIR 
Logger.compressLogFiles = function () {
  var fileTitleArr = ['info_', 'debug_', 'error_'];
  fileTitleArr.forEach(title => {
    // log file will be compressed if created the previous day
    var fileName = title + moment().subtract(1, "days").format(yearDate) + staticValues.TEXT_FILE_TYPE;
    if (fs.existsSync(logFileDir + fileName)) {
      const input = fs.createReadStream(logFileDir + fileName);
      const output = fs.createWriteStream(logFileDir + archiveFileDir + fileName + staticValues.GZIP_FILE_TYPE);
      if (!fs.existsSync(logFileDir + archiveFileDir)) {
        fs.mkdirSync(logFileDir + archiveFileDir);
      }
      input.pipe(gzip).pipe(output);
      fs.unlinkSync(logFileDir + fileName);
    }
  });
}
