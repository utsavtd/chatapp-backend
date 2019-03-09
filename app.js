var express = require('express');
require('dotenv').config();
var mongoDB = require('./config/mongodb');
var cors = require('cors')

var EventLog = require('./models/EventLog')
var Message = require('./models/Message')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var hbs = require('express-handlebars');


var index = require('./routes/index');
var room = require('./routes/room');
var api = require('./routes/api');

//var catalog = require('./routes/catalog');  //Import routes for "catalog" area of site


var app = express();
app.use(cors())


// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
    defaulLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var server = require('http').Server(app);
var io = require('socket.io')(server);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: 'asdfhakshfkash',
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    io.on('connection', function (socket) {
        console.log('connected with socket ID:', socket.id)
        let eventLog = new EventLog({
            name: "client connected with socket id " + socket.id
        })
        eventLog.save()

        socket.on('join', function (room) {
            console.log(room)
            socket.join(room.room);

            console.log('Joining room:', room.room);

            let eventLog = new EventLog({
                name: `User :  ${room.name} joined Room : ${room.room}`

            })
            eventLog.save()

            let message=new Message({
                message: `User :  ${room.name} joined Room : ${room.room}`,
                sender: 'system',
                room: room.room
            })
            message.save()

            io.in(room.room).emit("msg", message);
        });
    });
    res.io = io;

    next();
});
// Routing
app.use('/', index);
app.use('/room', room);
app.use('/api', api);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
    app: app,
    server: server
};