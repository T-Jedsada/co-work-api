var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    surname: String,
    age: String,
    phone: String
});

module.exports = mongoose.model('users', userSchema);