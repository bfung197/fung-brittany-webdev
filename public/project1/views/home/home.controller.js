(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController($location, userService, $rootScope) {

        var model = this;
        model.currentUser = currentUser;
    }

}());