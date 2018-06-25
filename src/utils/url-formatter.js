var qs = require('query-string');
var _ = require('lodash');

var logger = require('../../config/logger-config').Logger;

function setQueryParams(url, req) {
    var queryParams;
    logger.info(`Set Param for: ${url}`)
    if (!_.isEmpty(req.query)) {
        queryParams = qs.stringify(req.query);
        var loggedParameterRequest = queryParams.split('&');
        url = `${url}?${queryParams}`;
        _(loggedParameterRequest).forEach(parameters => {
            logger.info(parameters);
        });
    }
    return url;
}

module.exports = { setQueryParams };