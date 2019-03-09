'use strict';

var Application = require('../models/Application');
var Notification = require('../models/Notification');

//Create a notification
exports.create = function (req, res, next) {
    console.log('notificationcreate');
    req.checkBody('channel_name', 'Channel id cannot be empty.').notEmpty();
    req.checkBody('title', 'Title must not be empty').notEmpty();
    req.checkBody('body', 'Body cannot be empty').notEmpty();

    var notification = new Notification({
        channel_name: req.body.channel_name,
        title: req.body.title,
        body: req.body.body
    });
    var errors = req.validationErrors();
    if (errors) {
        res.status(400).json({ "message": "invalid parameters", "payload": errors });
        return;
    }
    notification.save(function (err) {
        if (err) {
            res.status(400).json({ "message": err.message, "payload": {} });
            return;
        } else {
            // Notification saved now start broadcasting.
            res.io.in(notification.channel_name).emit("msg", notification);
            //  res.io.in(notification.channel_name).emit('message', 'cool game');
            res.status(200).json({ "message": "ok", "payload": notification });
        }
    });
};

exports.list = function (req, res, next) {
    var query = Notification.find();
    if (req.body.channel_name) {
        query.where('channel_name').equals(req.body.channel_name);
    }
    query.limit(10).sort('createdAt');
    query.exec(function (err, notifications) {
        if (err) {
            res.status(400).json({ "message": err.message, "payload": {} });
            return;
        } else {
            res.status(200).json({ "message": "ok", "payload": notifications });
        }
    });
};
//# sourceMappingURL=NotificationController.js.map