(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService, $rootScope) {

        var model = this;
        model.login = login;

        function login(username, password) {
            if(username === null || typeof username==='undefined'){
                model.message="Username is required.";
                return;
            }
            if(password === null || typeof password==='undefined') {
                model.message = "Password is required.";
                return;
            }

            userService
                .login(username, password)
                .then(function(user) {
                    if(user !== null) {
                        $rootScope.currentUser = user;
                        $location.url('/user/' + user._id);
                    }
                },
                function(error) {
                model.message = "Unable to log in."
            });

        }
    }

}());