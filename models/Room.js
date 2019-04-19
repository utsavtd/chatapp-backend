var mongoose = require('mongoose');
// chat room schema
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {type: String},
    status: {type: String},
}, {
    timestamps: true
});


//Export model
module.exports = mongoose.model('Room', RoomSchema);
