var app = require('../../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer1_2017');

require('../assignment/services/user.service.server');
require('../assignment/services/website.service.server');
require('../assignment/services/page.service.server');
require('../assignment/services/widget.service.server');