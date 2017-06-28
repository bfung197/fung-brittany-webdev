(function () {
    angular
        .module('WAM', ['ngRoute'])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/user/:uid/users/search', {
                templateUrl: 'views/user/templates/user-search.view.client.html',
                controller: "userSearchController",
                controllerAs: "model"
            })
            .when('/exercises', {
                templateUrl: 'views/exercise/exercise-search.view.html'
            })
            .when('/user/:uid/exercises/search', {
                templateUrl: 'views/exercise/exercise-search.view.html'
            })
            .when('/user/:uid/exercises', {
                templateUrl: 'views/exercise/exercise-list.view.html',
                controller: 'exerciseListController',
                controllerAs: 'model'
            })
            .when('/', {
                templateUrl: 'home.html'
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
            .when('/user', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
            })
            .when('/user/:uid/profile', {
                templateUrl: 'views/user/templates/profile-view-small.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
            })

            .when('/user/:uid', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: 'websiteListController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'newWebsiteController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'editWebsiteController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'newPageController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'editPageController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl: 'views/widget/templates/views/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl: 'views/widget/templates/views/widget-choose.view.client.html',
                controller: 'newWidgetController',
                controllerAs: 'model',
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl: 'views/widget/templates/editors/widget-edit.view.client.html',
                controller: 'editWidgetController',
                controllerAs: 'model',
            })
            .when('/user/:uid/post/:poid/flickr/search', {
              templateUrl: 'views/post/templates/views/post-flickr-search.view.client.html',
                controller: 'flickrImageSearchController',
                controllerAs: 'model',
            })
            .when('/user/:uid/post/:poid', {
                templateUrl: 'views/post/templates/editors/post-edit.view.client.html',
                controller: 'editPostController',
                controllerAs: 'model',
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

    // function checkCurrentUser($q, $location, userService) {
    //     var deferred = $q.defer();
    //     userService
    //         .checkLoggedIn()
    //         .then(function (currentUser) {
    //             if(currentUser === '0') {
    //                 deferred.resolve({});
    //             } else {
    //                 deferred.resolve(currentUser);
    //             }
    //         });
    //     return deferred.promise;
    // }

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

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedIn').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                deferred.resolve(user);
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();