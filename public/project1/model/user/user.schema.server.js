var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    posts: [{type: mongoose.Schema.ObjectId, ref:"PostModel"}],
    exercises: [{type: mongoose.Schema.ObjectId, ref:"ExerciseModel"}],
    following: [{type: mongoose.Schema.ObjectId, ref:"UserModel"}], //who follows them
    follows: [{type: mongoose.Schema.ObjectId, ref:"UserModel"}], //who they follow
    dateCreated: {type: Date, default: Date.now},
    google: {
        id:    String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    }

}, {collection:'user'});

module.exports = userSchema;