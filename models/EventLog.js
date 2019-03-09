var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: {type: String},
}, {
    timestamps: true
});


//Export model
module.exports = mongoose.model('EventLog', EventSchema);
