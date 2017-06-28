var app = require('../../../express');
var exerciseModel = require('../model/exercise/exercise.model.server');

app.post('/api/user/:userId/exercise', addExercise);
app.get('/api/exercises', findAllExercises);
app.get('/api/exercise/:exerciseId', findExerciseById);
app.post('/api/user/:userId/exercise/create', createExercise);
app.get('/api/exercise', findExerciseByName);


function findExerciseByName(req, res) {
    var name = req.body;
    exerciseModel
        .findExerciseByName(name)
        .then(function(exercise) {
            res.json(exercise);
        })
}

function addExercise(req, res) {
    var exercise = req.body;
    var userId = req.params.userId;
    exerciseModel
        .addExercise(userId, exercise)
        .then(function(exercise) {
            res.json(exercise);
        });
}

function createExercise(req, res) {
    var exercise = req.body;
    var userId = req.params.userId;
    exerciseModel
        .addExercise(userId, exercise)
        .then(function(exercise) {
            res.json(exercise);
        });
}

function findAllExercises(req, res) {
    exerciseModel
        .findAllExercises()
        .then(function(exercises) {
            res.json(exercises);
        })
}

function findExerciseById(req, res) {
    var exerciseId = req.param['exerciseId'];
    exerciseModel
        .findExerciseById(exerciseId)
        .then(function(response) {
            res.json(response);
        })
}

//
// function findAllPagesForWebsite(req, res) {
//     pageModel
//         .findAllPagesForWebsite(req.params.websiteId)
//         .then(function (pages) {
//             res.json(pages);
//         });
// }
//
// function findPageById(req, res) {
//     var pageId = req.params.pageId;
//
//     pageModel
//         .findPageById(pageId)
//         .then(function (page) {
//             res.json(page);
//         });
// }
//
// function updatePage(req, res) {
//     var page = req.body;
//     var pageId = req.params.pageId;
//
//     pageModel
//         .updatePage(pageId, page)
//         .then(function (status) {
//             res.sendStatus(200);
//         });
// }
//
// function deletePage(req, res) {
//     var pageId = req.params.pageId;
//     var websiteId = req.params.websiteId;
//     pageModel
//         .deletePage(websiteId, pageId)
//         .then(function (status) {
//             res.json(status);
//         });
// }