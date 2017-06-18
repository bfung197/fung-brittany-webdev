var app = require('./express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(app.express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', function(req, res) {
    console.log(req.session);
    res.send(req.session);
});

require ("./test/app.js")(app);

require ("./public/assignment/app.js");

var port = process.env.PORT || 3000;

app.listen(port);