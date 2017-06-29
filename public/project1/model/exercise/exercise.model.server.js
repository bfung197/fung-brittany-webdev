var mongoose = require('mongoose');
var userModel = require('../../model/user/user.model.server');
var exerciseSchema = require('./exercise.schema.server');

var exerciseModel = mongoose.model('ExerciseModel', exerciseSchema);

exerciseModel.createExerciseForUser = createExerciseForUser;
exerciseModel.findAllExercisesForUser = findAllExercisesForUser;
exerciseModel.findExerciseById = findExerciseById;
exerciseModel.updateExercise = updateExercise;
exerciseModel.deleteExercise = deleteExercise;

module.exports = exerciseModel;

function createExerciseForUser(userId, exercise) {
    exercise._user = userId;
    return exerciseModel
        .create(exercise)
        .then(function(exercise) {
            return userModel
                .addExercise(userId, exercise._id)
        })
}

function findAllExercisesForUser(userId) {
    return exerciseModel
        .find({_user: userId})
        .populate("name" && "_user", "username")
        .exec();
}

function findExerciseById(exerciseId) {
    return exerciseModel
        .findById(exerciseId);
}

function updateExercise(exerciseId, exercise) {
    return exerciseModel
        .update({_id: exerciseId}, {
            $set: {
                _user: exercise._user,
                name: exercise.name,
                description: exercise.description,
            }
        });

}

function deleteExercise(exerciseId) {
    return exerciseModel
        .remove({_id: exerciseId});
}