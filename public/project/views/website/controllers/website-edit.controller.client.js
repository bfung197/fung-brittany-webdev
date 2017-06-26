(function () {
    angular
        .module('WAM')
        .controller('editWebsiteController', editWebsiteController);

    function editWebsiteController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function(website) {
                    model.website = website;
                });
        }

        init();

        // implementation

        function updateWebsite(website, name) {
            if(name === null || typeof name==='undefined' || name === ""){
                model.message="Name is required.";
                return;
            }

            websiteService
                .updateWebsite(website._id, website)
                .then(goToWebsites);
        }

        function goToWebsites () {
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(goToWebsites());
        }
    }
})();