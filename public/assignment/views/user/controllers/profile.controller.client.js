(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['uid'];

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();
    }
})();