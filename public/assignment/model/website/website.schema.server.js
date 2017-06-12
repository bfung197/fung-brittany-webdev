var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

websiteSchema = mongoose.Schema({
    _user: User,
    name: String,
    description: String,
    pages: [Page],
    dateCreated: Date
}, {collection:'websites'});