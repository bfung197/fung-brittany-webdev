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
        function createWebsite(website, name) {

            if(name === null || typeof name==='undefined'){
                model.message="Name is required.";
                return;
            }

            websiteService
                .createWebsite(model.userId, website)
                .then(function(website) {
                    $location.url('/user/' + model.userId + '/website');
                });
        }

        function renderWebsites(websites) {
            model.websites = websites
        }
    }
})();