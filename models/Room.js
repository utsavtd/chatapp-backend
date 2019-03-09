var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {type: String},
}, {
    timestamps: true
});


//Export model
module.exports = mongoose.model('Room', RoomSchema);
