"use strict";

/**
 * Created by unoapp on 2017-11-14.
 */
var Application = require('../models/Application');
var applicationMiddleware = function applicationMiddleware(req, res, next) {
    console.log(req.headers);
    var app = Application.findOne({ app_id: req.headers.app_id, app_secret: req.headers.app_secret }, function (err, appData) {
        if (err) {
            res.status(401).json({ "message": err.message, "payload": {} });
            return;
        } else {
            if (appData) {
                next();
            } else {
                next();

                //res.status(401).json({"message": "We know you are an explorer, but you can't go beyond this point.", "payload": {}});
                //return;
            }
        }
    });
};
module.exports = applicationMiddleware;
//# sourceMappingURL=applicationMiddleware.js.map