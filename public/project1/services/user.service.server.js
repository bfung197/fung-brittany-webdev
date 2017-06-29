var app = require('../../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var auth = authorized;


var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

app.get('/api/project/users', findAllUsers);
app.post('/api/project/user', createUser);
app.get('/api/project/user', findUserByCredentials);
app.get('/api/project/user/:uid', findUserById);
app.put('/api/project/user/:uid', updateUser);
app.delete('/api/project/user/:uid', isAdmin, deleteUser);
app.delete('/api/project/unregister', unregister);
app.post('/api/project/registerUser', registerUser);
app.get('/api/project/username', findUserByUsername);
app.post('api/project/follow/:uid', follow);

app.post('/api/project/login', passport.authenticate('local'), login);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.get('/api/project/checkLoggedIn', loggedIn);
app.get('/api/project/checkAdmin', checkAdmin);

app.get('/auth/project/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '#!/profile',
        failureRedirect: '#!/login'
    }));

app.get('/auth/project/facebook', passport.authenticate('facebook', {scope: 'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/project1/index.html#!/profile',
    failureRedirect: '#!/login'
}));

// var googleConfig = {
//     clientID        : process.env.GOOGLE_CLIENT_ID,
//     clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL     : process.env.GOOGLE_CALLBACK_URL
// };

var googleConfig = {
    clientID: '135713276321-gamppknaevrgk6fm5a2md77hcmq6ktq8.apps.googleusercontent.com',
    clientSecret: 'B5TQqfuNOm0vlTIGUJHzq4B1',
    callbackURL: 'http://localhost:3000/auth/google/callback'
};

// var facebookConfig = {
//     clientID        : process.env.FACEBOOK_CLIENT_ID,
//     clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL     : process.env.FACEBOOK_CALLBACK_URL
// };

var facebookConfig = {
    clientID: '476004756079445',
    clientSecret: '2e5a4ac49ed3224538dcb0467ab27c24',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user !== null) {
                    userModel
                        .updateGoogleToken(token, profile.id, user._id)
                        .then(function () {
                            return done(null, user);
                        });
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newGoogleUser)
                        .then(function(user) {
                            return done(null, user);
                        })
                }
            });
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
                if (user !== null) {
                    userModel
                        .updateFacebookToken(token, profile.id, user._id)
                        .then(function () {
                            return done(null, user);
                        });
                } else {
                    var newFacebookUser = {
                        username: profile.displayName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newFacebookUser)
                        .then(function(response) {
                            return done(null, response);
                        })
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

function follow(req, res) {
    var userId = req.params['uid'];
    var currentUser = req.user;
    console.log(currentUser);
    userModel
        .follow(userId, currentUser._id)
        .then(function(status){
            res.send(status);
        })
}

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

function checkAdmin(req, res) {
    if (req.isAuthenticated() &&
        req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function() {
            req.user.logout();
            res.sendStatus(200);
        })
}

<!-- local -->
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
                if (user && bcrypt.compareSync(password, user.password)) {
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

function registerUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function(user) {
            res.json(user);
        })
}

function loggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}
<!-- end local -->