module.exports = function(options) {
  return async function redirectRoute(req, res, next) {
    const decodedBaseUrl = decodeURI(req.url);

    try {
      if (findForData(decodedBaseUrl, 'scichart2d.data')) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.statusCode = 200;
        res.end(options['2dData']);
      } else {
        next();
      }
    } catch (error) {
      // Not passing the error as it's caused by URL that was user-provided so we
      // can't do anything about the error.
      return next();
    }
  };
};

function findForData(url, pattern) {
  return url.endsWith(pattern);
}
