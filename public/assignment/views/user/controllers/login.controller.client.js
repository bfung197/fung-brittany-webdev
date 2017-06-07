(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Unable to log in.";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/user/' + found._id);
                } else {
                    model.message = "Unable to log in.";
                }
            }
        }
    }

    }());