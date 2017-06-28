var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    type: {type: String, enum :["YOUTUBE", "IMAGE", "HEADING"]},
    name: {type: String, default: 'Text'},
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: {type: String, default: '100%'},
    height: String,
    rows: {type: Number, default: 1},
    size: {type: Number, default: 0},
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection:'post'});

module.exports = postSchema;