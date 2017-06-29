(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService, $rootScope) {

        var model = this;
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if (username === null || typeof username === 'undefined') {
                model.message = "Username is required.";
                return;
            }
            if (password === null || typeof password === 'undefined') {
                model.message = "Password is required.";
                return;
            }

            if (password2 === null || typeof password2 === 'undefined') {
                model.message = "Password verification is required.";
                return;
            }

            if (password !== password2) {
                model.message = "Passwords must match";
                return;
            }

            userService
                .findUserByUsername(username)
                .then(register, handleError);

            function handleError() {
                model.message = "Unable to register."
            }

            function register(found) {
                if (found !== null) {
                    model.message = "Username not available."
                }
                else {
                    var newUser = {
                        username: username,
                        password: password
                    };

                    userService
                        .register(newUser)
                        .then(function (user) {
                            $rootScope.currentUser = user;
                            $location.url("/profile");
                        });
                }
            }
        }
    }
})();