(function () {
    angular
        .module('WAM')
        .controller('newExerciseController', newExerciseController);

    function newExerciseController(currentUser, $routeParams, exerciseService, $location) {

        var model = this;
        model.userId = currentUser._id;

        // event handlers
        model.createExercise = createExercise;

        function init() {
            exerciseService
                .findAllExercisesForUser(model.userId)
                .then(renderExercises)
        }
        init();

        // implementation
        function createExercise(exercise, name) {

            if(name === null || typeof name==='undefined'){
                model.message="Name is required.";
                return;
            }

            exerciseService
                .createExercise(model.userId, exercise)
                .then(function() {
                    $location.url('/profile/exercises');
                });
        }

        function renderExercises(exercises) {
            model.exercises = exercises
        }
    }
})();