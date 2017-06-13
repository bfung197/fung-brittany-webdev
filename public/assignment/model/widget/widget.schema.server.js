var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;

widgetSchema = mongoose.Schema({
    _page: Page,
    type: String, enum,
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    dateCreated: Date
}, {collection:'widget'});