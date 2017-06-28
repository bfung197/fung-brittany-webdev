var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'STUDENT', 'FACULTY', 'ADMIN']}],
    posts: [{type: mongoose.Schema.ObjectId, ref:"PostModel"}],
    exercises: [{type: mongoose.Schema.ObjectId, ref: "ExerciseModel"}],
    dateCreated: {type: Date, default: Date.now},
    facebook: {
        id:    String,
        token: String
    }

}, {collection:'user'});

module.exports = userSchema;