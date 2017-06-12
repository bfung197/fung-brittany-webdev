(function () {
    angular
        .module("pocApp", [])
        .controller("pocController", pocController);

    function pocController($http) {
        var model = this;
        model.searchExercise = searchExercise;
        model.searchDetails = searchDetails;

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
    }
})();