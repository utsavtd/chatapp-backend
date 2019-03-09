"use strict";

/**
 * Created by unoapp on 2017-11-14.
 */
var notFoundMiddleware = function notFoundMiddleware(req, res, next) {
  res.status(404).json({ "message": "Sorry we tried but could not find your page.", "payload": {} });
  return;
};
module.exports = notFoundMiddleware;
//# sourceMappingURL=notFoundMiddleware.js.map