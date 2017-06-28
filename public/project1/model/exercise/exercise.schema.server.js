var mongoose = require('mongoose');

var exerciseSchema = mongoose.Schema({
    name: String,
    description: String,
    users: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}],
    dateCompleted: {type: Date, default: Date.now},

}, {collection:'exercise'});

module.exports = exerciseSchema;