(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, userService, $location) {

        var model = this;
        model.currentUser = currentUser;
    }

}());