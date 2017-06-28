(function () {
    angular
        .module('WAM')
        .controller('userSearchController', userSearchController);

    function userSearchController(userService) {

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