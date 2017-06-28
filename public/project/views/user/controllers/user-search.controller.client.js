(function () {
    angular
        .module('WAM')
        .controller('userSearchController', userSearchController);

    function userSearchController($location, userService, $rootScope) {

        var model = this;

        function init() {
            userService
                .findAllUsers()
                .then(function(response) {
                    model.users = response;
                })
        }
        init();
    }
})();