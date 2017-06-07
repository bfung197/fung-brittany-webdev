(function () {
    angular
        .module('WAM')
        .controller('newWebsiteController', newWebsiteController);

    function newWebsiteController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['uid'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites)
        }
        init();

        // implementation
        function createWebsite(website, userId) {
            website.developerId = model.userId;

            websiteService
                .createWebsite(website)
                .then(goToWebsites);
        }

        function goToWebsites() {
            $location.url('/user/' + model.userId + '/website');
        }

        function renderWebsites(websites) {
            model.websites = websites
        }
    }
})();