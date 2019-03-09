var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: {type: String},
    sender:{type:String},
    room:{type:String}
}, {
    timestamps: true
});


//Export model
module.exports = mongoose.model('Message', MessageSchema);
