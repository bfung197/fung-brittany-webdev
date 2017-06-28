var app = require('../../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer1_2017');

require('../project/services/user.service.server');
require('../project/services/website.service.server');
require('../project/services/page.service.server');
require('../project/services/widget.service.server');
require('../project/services/post.service.server');
require('../project/services/exercise.service.server');