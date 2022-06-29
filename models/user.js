const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

// using the password plugin
userSchema.plugin(passportLocalMongoose);

// creating and exporting in one line is also allowed 
module.exports = mongoose.model('User', userSchema);