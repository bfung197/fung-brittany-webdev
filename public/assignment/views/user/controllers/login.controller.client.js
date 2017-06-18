(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;
        model.logout = logout;

        function login(username, password) {

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Unable to log in.";
            }

            function login(user) {
                userService
                    .login(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $location.url("/profile");
                        })
            }
        }
    }

    }());