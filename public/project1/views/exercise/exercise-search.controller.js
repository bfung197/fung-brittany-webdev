(function () {
    angular
        .module("WAM")
        .controller("exerciseController", exerciseController);

    function exerciseController($routeParams, $http, exerciseService, userService) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.searchExercise = searchExercise;
        model.searchDetails = searchDetails;
        model.addExercise = addExercise;

        function searchExercise(muscle) {
            var url = "https://wger.de/api/v2/exercise/?muscles=" + muscle + "&language=2";
            $http.get(url)
                .then(function (response) {
                    model.exercises = response.data.results;
                })
        }

        function searchDetails(exerciseId) {
            var url = "https://wger.de/api/v2/exercise/" + exerciseId;
            $http.get(url)
                .then(function (response) {
                    model.exercise = response.data;
                    model.description = response.data.description;
                    document.getElementById('description').innerHTML = model.description;
                })
        }

        function addExercise(exercise) {
            if (model.userId === undefined) {
                model.error = "Please log in to add exercise to program."
            }
            else {
                exerciseService
                    .findExerciseByName(exercise.name)
                    .then(function(response) {
                        if(response !== null) {
                            exerciseService
                                .addExercise(response, model.userId)
                                .then(function() {
                                    model.message = "Exercise added."
                                })
                        } else {
                            exerciseService
                                .createExercise(exercise, model.userId)
                                .then(function() {
                                    model.message = "Exercise created and added."
                                })
                        }
                    });
            }
        }
    }
})();