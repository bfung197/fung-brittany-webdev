(function () {
    angular
        .module("WAM")
        .controller("exerciseSearchController", exerciseSearchController);

    function exerciseSearchController(currentUser, $http, exerciseService) {
        var model = this;
        model.searchExercise = searchExercise;
        model.searchDetails = searchDetails;
        model.addExercise = addExercise;
        model.user = currentUser;

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
                    model.exercise.description = response.data.description;
                    document.getElementById('description').innerHTML = model.exercise.description;
                })
        }

        function addExercise(exercise) {
            if (currentUser === undefined || currentUser === null || !currentUser) {
                model.error = "Please log in to add exercise to program."
            }
            else {
                exerciseService
                    .findExerciseByName(exercise.name)
                    .then(function(response) {
                        if(response !== null) {
                            exerciseService
                                .addExercise(response, currentUser._id)
                                .then(function() {
                                    model.message = "Exercise added."
                                })
                        } else {
                            exerciseService
                                .createExercise(exercise, currentUser._id)
                                .then(function() {
                                    model.message = "Exercise created and added."
                                })
                        }
                    });
            }
        }
    }
})();