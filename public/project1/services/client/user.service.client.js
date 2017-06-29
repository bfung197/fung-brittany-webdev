(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            register: register,
            findAllUsers : findAllUsers,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            unregister: unregister,
            registerUser: registerUser,
            follow: follow
        };

        return api;

        function follow(userId) {
            return $http.post("/api/project/follow/" + userId)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                })
        }

        function registerUser(user) {
            return $http.post("/api/project/registerUser", user)
                .then(function(response) {
                    return response.data;
                })
        }

        function unregister() {
            var url = "/api/project/unregister";
            return $http.delete(url)
                .then(function(response) {
                    console.log(response);
                    return response;
                })
        }

        function checkAdmin() {
            var url = "/api/project/checkAdmin";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }


        function findAllUsers() {
            var url = "/api/project/users";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })

        }

        function register(user) {
            return $http.post("/api/project/register", user)
                .then(function(response) {
                    return response.data;
                })
        }

        function logout() {
            return $http
                .post("/api/project/logout")
                .then(function(response) {
                    return response.data;
                })
        }

        function login(username, password) {
            var url = "/api/project/login";
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
            var url = "/api/project/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url ="/api/project/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = "/api/project/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username=" + username + "&password=" + password;
            return $http.get(url, username, password)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/project/username?username=" + username;
            return $http.get(url, username)
                .then(function(response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();