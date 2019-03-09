'use strict';

var express = require('express');
require('dotenv').config();
var mongoDB = require('./config/mongodb');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var hbs = require('express-handlebars');
var notFoundMiddleware = require('./middlewares/notFoundMiddleware');

var index = require('./routes/index');
//var users = require('./routes/users');
var applications = require('./routes/application');
var notification = require('./routes/notification');
//var catalog = require('./routes/catalog');  //Import routes for "catalog" area of site


var app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaulLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var server = require('http').Server(app);
var io = require('socket.io')(server);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'asdfhakshfkash',
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    res.io = io;
    io.on('connection', function (socket) {
        console.log('connected with socket ID:', socket.id);
        socket.on('join', function (room) {
            socket.join(room);
            console.log('Joining room:', room);
        });
    });
    next();
});
// Routing
app.use('/', index);
//app.use('/users', users);
app.use('/app', applications);
app.use('/notification', notification);
//app.use('/catalog', catalog);  // Add catalog routes to middleware chain.


// catch 404 and forward to error handler
app.use(notFoundMiddleware);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app: app, server: server };
//# sourceMappingURL=app.js.map