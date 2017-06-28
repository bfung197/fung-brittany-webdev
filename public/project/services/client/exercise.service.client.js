(function () {
    angular
        .module('WAM')
        .service('exerciseService', exerciseService);

    function exerciseService($http) {

        return {
            searchExercise: searchExercise,
            searchDetails: searchDetails,
            addExercise: addExercise,
            findAllExercises: findAllExercises,
            createExercise: createExercise,
            findExerciseByName: findExerciseByName
        };

        function findExerciseByName(name) {
            var url = "/api/exercise"
            $http.get(url, name)
                .then(function(response) {
                    return response.data;
                })
        }

        function findAllExercises() {
            var url = "/api/exercises";
            $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function searchExercise(muscle) {
            var url = "https://wger.de/api/v2/exercise/?muscles=" + muscle + "&language=2";
            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data.results;
                })
        }

        function searchDetails(exerciseId) {
            var url = "https://wger.de/api/v2/exercise/" + exerciseId;
            $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addExercise(exercise, userId) {
            var url = "/api/user/" + userId + "/exercise";
            $http.post(url, exercise);
        }

        function createExercise(exercise, userId) {
            var url = "/api/user/" + userId + "/exercise/create";
            $http.post(url, exercise);
        }
    }
})();