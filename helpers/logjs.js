/**
 * Created by unoapp on 2017-11-17.
 */
var log4js = require('log4js');
log4js.configure({
    appenders: { express: { type: 'file', filename: "log/express-"+new Date().toISOString().substring(0, 10)+".log" } },
    categories: { default: { appenders: ['express'], level: 'info' } }
});
const logger = log4js.getLogger('express');
module.exports = logger

