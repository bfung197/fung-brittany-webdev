(function () {
    angular
        .module('WAM')
        .controller('adminController', adminController);

    function adminController(userService) {

        var model = this;

        function init() {
            userModel
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                })
        }
        init();
    }
}());