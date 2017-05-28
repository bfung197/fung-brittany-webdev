(function () {
    angular
        .module('WAM')
        .controller('newWebsiteController', newWebsiteController);

    function newWebsiteController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        var userId = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(userId);
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+userId+'/website');
        }
    }
})();