(function () {
    angular
        .module("WAM")
        .controller("exerciseListController", exerciseListController);

    function exerciseListController(exerciseService, currentUser) {
        var model = this;
        model.userId = currentUser._id;


        function init() {

            exerciseService
                .findAllExercisesForUser(model.userId)
                .then(renderExercises)
        }
        init();

        function renderExercises(exercises) {
            model.exercises = exercises;
        }

    }
})();