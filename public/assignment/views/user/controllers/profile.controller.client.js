(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();
    }
})();