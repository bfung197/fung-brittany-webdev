(function () {
    angular
        .module('WAM')
        .controller('userSearchController', userSearchController);

    function userSearchController(userService) {

        var model = this;
        model.follow = follow;

        function init() {
            userService
                .findAllUsers()
                .then(function(response) {
                    model.users = response;
                })
        }
        init();

        function follow(user) {
            console.log(user);
            userService
                .follow(user._id)
                .then(function() {
                    model.message = "User followed!";
                })
        }
    }
})();