(function () {
    angular
        .module('WAM', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/profile/post/:poid', {
                templateUrl: 'views/post/templates/editors/post-edit.view.client.html',
                controller: 'editPostController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/users/search', {
                templateUrl: 'views/user/templates/user-search.view.client.html',
                controller: "userSearchController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/exercises', {
                templateUrl: 'views/exercise/templates/exercise-search.view.client.html',
                controller: 'exerciseSearchController',
                controllerAs: 'model'
            })
            .when('/profile/exercises/search', {
                templateUrl: 'views/exercise/templates/exercise-search.view.client.html',
                controller: 'exerciseSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/exercises/new', {
                templateUrl: 'views/exercise/templates/exercise-new.view.html',
                controller: 'newExerciseController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/exercises/:eid', {
                templateUrl: 'views/exercise/templates/exercise-edit.view.html',
                controller: 'editExerciseController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/exercises', {
                templateUrl: 'views/exercise/templates/exercise-list.view.html',
                controller: 'exerciseListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile-small', {
                templateUrl: 'views/user/templates/profile-small.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/post/:poid/flickr/search', {
              templateUrl: 'views/post/templates/views/post-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/profile/post/:poid', {
                templateUrl: 'views/post/templates/editors/post-edit.view.client.html',
                controller: 'editPostController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'adminController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
    }

    function checkCurrentUser($q, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, userService, $location) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function(currentUser) {
               if(currentUser === '0') {
                   deferred.reject();
                   $location.url('/login');
               } else {
                   deferred.resolve(currentUser);
               }
            });
        return deferred.promise;
    }
})();