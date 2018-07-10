const moment = require('moment');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const _ = require('lodash');
const fs = require('fs');

const DATE_TIME_FORMAT = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
const YEAR_DATE_FORMAT = moment().format('YYYY-MM-DD');
const LOG_FILE_NAME = `logs_${YEAR_DATE_FORMAT}.txt`;
const ARCHIVE_FILE_DIR = 'archive/';
const LOG_FILE_DIR = 'logs/';
const UTF8_FORMAT = 'utf8';

var Logger = exports.Logger = {};

var logStream;

// CREATE LOG FILE DIR 
if (!fs.existsSync(LOG_FILE_DIR)) {
  fs.mkdirSync(LOG_FILE_DIR);
}

//CREATE LOG FILE
Logger.log = function (msg) {
  var message = `${DATE_TIME_FORMAT}:${msg}\n`;
  if (fs.existsSync(`${LOG_FILE_DIR}${LOG_FILE_NAME}`)) {
    fs.appendFileSync(`${LOG_FILE_DIR}${LOG_FILE_NAME}`, message, UTF8_FORMAT);
  } else {
    logStream = fs.createWriteStream(LOG_FILE_DIR + LOG_FILE_NAME);
    logStream.write(message);
  }
}

// COMPRESS ALL LOG FILE AND MOVE IT TO logs/archive DIR 
Logger.compressLogFiles = function () {
  // log file will be compressed if created the previous day
  var fileName = 'logs_' + moment().subtract(1, "days").format("YYYY-MM-DD") + '.txt';
  if (fs.existsSync(LOG_FILE_DIR + fileName)) {
    const input = fs.createReadStream(LOG_FILE_DIR + fileName);
    const output = fs.createWriteStream(LOG_FILE_DIR + ARCHIVE_FILE_DIR + fileName + '.gz');
    if (!fs.existsSync(LOG_FILE_DIR + ARCHIVE_FILE_DIR)) {
      fs.mkdirSync(LOG_FILE_DIR + ARCHIVE_FILE_DIR);
    }
    input.pipe(gzip).pipe(output);
    fs.unlinkSync(LOG_FILE_DIR + fileName);
  }

}
