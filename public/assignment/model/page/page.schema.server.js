var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

pageSchema = mongoose.Schema({
    _website: Website,
    name: String,
    title: String,
    description: String,
    widgets: [Widget],
    dateCreated: Date
}, {collection:'pages'});