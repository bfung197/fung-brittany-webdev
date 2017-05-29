(function () {
    angular
        .module('WAM')
        .controller('newWebsiteController', newWebsiteController);

    function newWebsiteController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }

        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;
            websiteService.createWebsite(website);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();