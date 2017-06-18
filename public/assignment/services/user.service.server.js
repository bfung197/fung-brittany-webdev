var app = require('../../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

app.post('/api/user', createUser);
app.get('/api/user?username=username', findUserByUsername);
app.get('/api/user', findUserByCredentials);
app.get('/api/user/:uid', findUserById);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);
app.post  ('/api/login', passport.authenticate('WAM'), login);
app.post('/api/logout', logout);
app.post ('/api/register', register);
app.get ('/api/loggedIn', loggedIn);
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#/user',
        failureRedirect: '/#/login'
    }));

function findUserByUsername(req, res) {
    var username = req.params['username'];

    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params['uid'];

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['uid'];

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];

    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if(user != null) {
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}


function findUserById(req, res) {
    var userId = req.params['uid'];

    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    developerModel
        .findDeveloperById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user.username === username && user.password === password) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function register (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(
        function(user){
            if(user){
                req.login(user, function(err) {
                    if(err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        }
    );
}

function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

