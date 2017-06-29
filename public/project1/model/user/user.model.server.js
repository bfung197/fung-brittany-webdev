var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addExercise = addExercise;
userModel.removeExercise = removeExercise;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findAllUsers = findAllUsers;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.updateFacebookToken = updateFacebookToken;
userModel.updateGoogleToken = updateGoogleToken;
userModel.follow = follow;

module.exports = userModel;

function updateGoogleToken(token, profileId, userId) {
    var google = {
        id: profileId,
        token: token
    };

    return userModel
        .update({_id: userId}, {
            $set: {
                google: google
            }
        });
}

function updateFacebookToken(token, profileId, userId) {
    var facebook = {
        id: profileId,
        token: token
    };

    return userModel
        .update({_id: userId}, {
            $set: {
                facebook: facebook
            }
        });
}

function follow(userId, currentUserId) {
    userModel
        .findById(currentUserId)
        .then(function(currentUser) {
            userModel
                .findById(userId)
                .then(function(user) {
                    user.following.push(currentUserId);
                    return user.save();
                });
            currentUser.follows.push(userId);
            return currentUser.save();
        })
}

function findAllUsers() {
    return userModel
        .find();
}

function createUser(user) {
    if (user.roles) {
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['USER'];
    }
    return userModel
        .create(user);
}

function findUserById(userId) {
    return userModel
        .findById(userId);
}

function findUserByUsername(username) {
    return userModel
        .findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel
        .findOne({username: username} && {password: password});
}

function updateUser(userId, user) {
    delete user.username;
    delete user.password;
    if(typeof user.roles === 'string') {
        user.roles = user.roles.split(',');
        console.log(user.roles);
    }
    return userModel
        .update({_id: userId}, {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                roles: user.roles
            }
        });
}

function deleteUser(userId) {
    return userModel
        .remove({_id: userId});
}


function addExercise(userId, exerciseId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.exercises.push(exerciseId);
            return user.save();
        })
}

function removeExercise(userId, exerciseId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var index = user.exercises.indexOf(exerciseId);
            user.exercises.splice(index, 1);
            return user.save();
        });
}

function findUserByFacebookId(facebookId) {
    return userModel
        .findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}
