var app = require('../../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer1_2017');

require('../project1/services/user.service.server');
require('../project1/services/website.service.server');
require('../project1/services/page.service.server');
require('../project1/services/widget.service.server');
require('../project1/services/post.service.server');
require('../project1/services/exercise.service.server');