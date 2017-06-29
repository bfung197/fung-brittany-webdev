(function () {
    angular
        .module('WAM')
        .service('exerciseService', exerciseService);

    function exerciseService($http) {

        return {
            searchExercise: searchExercise,
            searchDetails: searchDetails,
            createExercise: createExercise,
            findAllExercisesForUser: findAllExercisesForUser,
            findExerciseById: findExerciseById,
            updateExercise: updateExercise,
            deleteExercise: deleteExercise
        };


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


        function createExercise(userId, exercise) {
            return $http.post("/api/user/exercise")
                .then(function (response) {
                    return response.data;
                })
        }

        function updateExercise(exerciseId, exercise) {
            var url = "/api/exercise/" + exerciseId;
            return $http.put(url, exercise)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteExercise(exerciseId) {
            var url ="/api/exercise/" + exerciseId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findExerciseById(exerciseId) {
            var url = "/api/exercise/" + exerciseId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllExercisesForUser(userId) {
            var url = "/api/" + userId + "/exercises";
            return $http.get(url, userId)
                .then(function (response) {
                    return response.data;
                });
        }
    }

    })();