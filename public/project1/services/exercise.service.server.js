var app = require('../../../express');
var exerciseModel = require('../model/exercise/exercise.model.server');

app.post('/api/user/exercise', createExercise);
app.get('/api/:userId/exercises', findAllExercisesForUser);
app.get('/api/exercise/:exerciseId', findExerciseById);
app.put('/api/exercise/:exerciseId', updateExercise);
app.delete('/api/exercise/:exerciseId', deleteExercise);


function createExercise(req, res) {
    var exercise = req.body;
    var userId = req.user._id;
    exercise._user = userId;
    exerciseModel
        .createExerciseForUser(userId, exercise)
        .then(function(exercise) {
            console.log(exercise);
            res.json(exercise);
        });
}

function findAllExercisesForUser(req, res) {
    var userId = req.params['userId'];
    exerciseModel
        .findAllExercisesForUser(userId)
        .then(function (exercises) {
            res.json(exercises);
        });
}

function findExerciseById(req, res) {
    var exerciseId = req.params.exerciseId;

    exerciseModel
        .findExerciseById(exerciseId)
        .then(function (exercise) {
            res.json(exercise);
        });
}

function updateExercise(req, res) {
    var exercise = req.body;
    var exerciseId = req.params.exerciseId;

    exerciseModel
        .updateExercise(exerciseId, exercise)
        .then(function (status) {
            res.sendStatus(200);
        });
}


function deleteExercise(req, res) {
    var exerciseId = req.params.exerciseId;
    var userId = req.user._id;
    exerciseModel
        .deleteExercise(userId, exerciseId)
        .then(function (status) {
            res.json(status);
        });
}
