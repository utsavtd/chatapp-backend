var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

//Export model
module.exports = mongoose.model('User', UserSchema);