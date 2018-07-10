const qs = require('query-string');
const _ = require('lodash');

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

function urlParameters(request) {
    var queryString = Object.keys(request).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(request[key])
    }).join('&');
    return queryString;
}
module.exports = { setQueryParams, urlParameters };