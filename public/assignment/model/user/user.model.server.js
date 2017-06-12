var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;


userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

modules.export = userModel;


function createUser(user) {

}

function findUserById(userId) {

}

function findUserByUsername(username) {

}

function findUserByCredentials(username, password) {

}

function updateUser(userId, user) {

}

function deleteUser(userId) {

}