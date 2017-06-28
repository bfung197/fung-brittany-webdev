(function () {
    angular
        .module("WAM")
        .controller("exerciseListController", exerciseListController);

    function exerciseListController($routeParams, userService, exerciseService) {
        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            userService
                .findAllExercisesForUser(model.userId)
                .then(renderExercises)
        }
        init();

        function renderExercises(exercises) {
            model.exercises = exercises;
        }

    }
})();