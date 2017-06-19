(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService, $rootScope) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2) {

            if (password !== password2) {
                model.error = "Passwords must match";
                return;
            }

            userService
                .findUserByCredentials(username, password)
                .then(function (found) {
                    if (found !== null) {
                        model.error = "Username is not available";
                    }
                },
                function() {
                    var newUser = {
                        username: username,
                        password: password
                    };

                    return userService
                        .register(newUser)
                        .then(function(user) {
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        })
                })
        }
    }
})();