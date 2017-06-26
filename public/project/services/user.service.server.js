var app = require('../../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");


app.get('/api/users', findAllUsers);
app.post('/api/user', createUser);
app.get('/api/user', findUserByCredentials);
app.get('/api/user/:uid', findUserById);
app.put('/api/user/:uid', updateUser);
app.delete('/api/user/:uid', deleteUser);
app.get('/api/assignment/user', findUserByUsername);

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
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

function findUserByUsername(req, res) {
    var username = req.query['username'];
    userModel
        .findUserByUsername(username)
        .then(function (user) {
                res.json(user);
        });
}

function findUserByCredentials(req, res) {
    var password = req.query['password'];
    var username = req.query['username'];
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
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

<!-- local -->
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/login', passport.authenticate('local'), login);
app.post('/api/logout', logout);
app.post('/api/register', register);
app.get('/api/loggedIn', loggedIn);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    done(null, false);
                }
            },
            function (err) {
                done(err, false);
            }

        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.json(user);
            });
        });
}

function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}
<!-- end local -->

<!-- facebook -->
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'name']
};

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/assignment/index.html#!/user',
    failureRedirect: '/assignment/index.html#!/'
}));

//passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var facebookUser  = {
                        username:  profile.displayName,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(facebookUser)
                        .then(function(response) {
                            console.log(response._id);
                            this.userId = response._id;
                            return done(null, response);
                        })
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}
<!-- end facebook -->