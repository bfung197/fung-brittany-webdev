var mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},

}, {collection:'exercise'});

module.exports = exerciseSchema;