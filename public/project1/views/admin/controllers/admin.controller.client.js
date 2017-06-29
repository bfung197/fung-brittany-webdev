(function () {
    angular
        .module('WAM')
        .controller('adminController', adminController);

    function adminController(currentUser, userService, $location) {

        var model = this;
        model.user = currentUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;

        function init() {
            findAllUsers();
        }
        init();

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function(users){
                    model.users = users;
                })
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
            model.user = angular.copy(user);
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers);
        }

        function logout() {
            userService
                .logout()
                .then(
                    function () {
                        $location.url('/');
                    })
        }

        function createUser(user) {
            userService
                .registerUser(user)
                .then(findAllUsers);
        }
    }
}());