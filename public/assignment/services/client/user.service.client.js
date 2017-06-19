(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            findAllUsers : findAllUsers
        };

        return api;


        function findAllUsers() {
            var url = "/api/users";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })

        }

        function register(user) {
            return $http.post("/api/register", user)
                .then(function(response) {
                    return response.data;
                })
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function(response) {
                    return response.data;
                })
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url ="/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url ="/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();