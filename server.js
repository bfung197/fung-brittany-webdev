var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(app.express.static(__dirname + '/public'));
//app.use(session({secret: process.env.SESSION_SECRET}));
app.use(session({secret: 'bfwbdvss'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require ("./test/app.js")(app);

require ("./public/project1/app.js");


var port = process.env.PORT || 3000;

app.listen(port);