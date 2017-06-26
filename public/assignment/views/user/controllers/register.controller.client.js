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
                model.error = "Username is required.";
                return;
            }
            if (password === null || typeof password === 'undefined') {
                model.error = "Password is required.";
                return;
            }

            if (password2 === null || typeof password2 === 'undefined') {
                model.error = "Password verification is required.";
                return;
            }

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }
            console.log(username);

            userService
                .findUserByUsername(username)
                .then(register, handleError);

            function handleError() {
                model.message = "Unable to register."
            }

            function register(found) {
                console.log(found);
                if (found !== null) {
                    model.message = "Username not available."
                }
                else {
                    var newUser = {
                        username: username,
                        password: password
                    };

                    console.log(newUser);

                    userService
                        .register(newUser)
                        .then(function (user) {
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        });
                }
            }
        }
    }
})();