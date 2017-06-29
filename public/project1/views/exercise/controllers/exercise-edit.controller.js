(function () {
    angular
        .module('WAM')
        .controller('editExerciseController', editExerciseController);

    function editExerciseController(currentUser, $routeParams, exerciseService, $location) {

        var model = this;
        model.exerciseId = $routeParams['eid'];
        model.userId = currentUser._id;
        // event handlers
        model.updateExercise = updateExercise;
        model.deleteExercise = deleteExercise;

        function init() {
            exerciseService
                .findAllExercisesForUser(model.userId)
                .then(function(exercises) {
                    model.exercises = exercises;
                });
            exerciseService
                .findExerciseById(model.exerciseId)
                .then(function(exercise) {
                    model.exercise = exercise;
                });
        }

        init();

        // implementation

        function updateExercise(exercise, name) {
            if(name === null || typeof name==='undefined' || name === ""){
                model.message="Name is required.";
                return;
            }

            exerciseService
                .updateExercise(exercise._id, exercise)
                .then(goToExercises);
        }

        function goToExercises () {
            $location.url('/profile/exercises');
        }

        function deleteExercise(exerciseId) {
            exerciseService
                .deleteExercise(exerciseId)
                .then(goToExercises());
        }
    }
})();