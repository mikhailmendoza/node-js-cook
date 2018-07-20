'use strict';

function urlQueryParams (request) {
  return Object.keys(request).map(key => `${key}=${encodeURIComponent(request[key])}`).join('&');
}

module.exports = { urlQueryParams };
