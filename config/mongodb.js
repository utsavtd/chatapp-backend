var mongoose=require('mongoose');
// mongoose.createConnection('localhost:27017/notification');
mongoose.Promise = require('bluebird');
var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

//mongodb://username:password@host:port/database
mongoose.connect("mongodb://localhost:27017/chatapp",options,function(err){
    if(err){
        console.log("mongo db connection error :",err.message);
    }
});
db = mongoose.connection;

db.once('open', function () {
    console.log('Connected to database!');
});

db.on('error', console.error.bind(console, 'Error:'));
module.exports =db;