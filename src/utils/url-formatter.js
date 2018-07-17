function urlQueryParams(request) {
    var queryString = Object.keys(request).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(request[key])
    }).join('&');
    return queryString;
}
module.exports = { urlQueryParams };