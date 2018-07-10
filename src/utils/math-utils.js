'use strict';

const roundTo = require('round-to');

var percentage = function (num, per) {
    var result = (num / 100) * per;
    return roundTo(result, 0);
}

module.exports = { percentage };