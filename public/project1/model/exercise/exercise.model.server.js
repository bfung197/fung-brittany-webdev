var mongoose = require('mongoose');
var userModel = require('../../model/user/user.model.server');
var exerciseSchema = require('./exercise.schema.server');

var exerciseModel = mongoose.model('ExerciseModel', exerciseSchema);

exerciseModel.addExercise = addExercise;
exerciseModel.findAllExercises = findAllExercises;
exerciseModel.findExerciseById = findExerciseById;
exerciseModel.addUser = addUser;
exerciseModel.createExercise = createExercise;
exerciseModel.findExerciseByName = findExerciseByName;
// exerciseModel.findAllExercisesForUser = findAllPagesForWebsite;
// exerciseModel.findPageById = findPageById;
// exerciseModel.updatePage = updatePage;
// exerciseModel.deletePage = deletePage;

module.exports = exerciseModel;

function findExerciseByName(name) {
    exerciseModel
        .findOne({name: name});
}

function addExercise(userId, exercise) {
    return userModel
        .addExercise(userId, exercise)

}

function createExercise(exercise, userId) {
    exercise.users = [];
    exercise.users.push(userId);
    return exerciseModel
        .create(exercise)
        .then(function (exercise) {
            return userModel
                .addExercise(userId, exercise)
        });
}

function addUser(exerciseId, userId) {
    return exerciseModel
        .findExerciseById(exerciseId)
        .then(function (exercise) {
            exercise.users.push(userId);
            return exercise.save();
        })
}

function findAllExercises() {
    exerciseModel
        .find();
}

function findExerciseById(exerciseId) {
    exerciseModel
        .findById(exerciseId);
}

// function findAllPagesForWebsite(websiteId) {
//     return pageModel
//         .find({_website: websiteId})
//         .populate('_website', 'name')
//         .exec();
// }
//
// function findPageById(pageId) {
//     return pageModel
//         .findById(pageId);
// }
//
// function updatePage(pageId, page) {
//     return pageModel
//         .update({_id: pageId}, {
//             $set : {
//                 _website: page._website,
//                 name: page.name,
//                 title: page.title,
//                 description: page.description,
//             }
//         });
//
// }
//
// function deletePage(websiteId, pageId) {
//     return pageModel
//         .remove({_id: pageId})
//         .then(function (status) {
//             return websiteModel
//                 .removePage(websiteId, pageId);
//         });
// }