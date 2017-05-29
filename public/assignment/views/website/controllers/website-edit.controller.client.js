(function () {
    angular
        .module('WAM')
        .controller('editWebsiteController', editWebsiteController);

    function editWebsiteController($routeParams,
                                   websiteService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        // implementation

        function updateWebsite(website) {
            websiteService.updateWebsite();
            $location.url('/user/' + model.userId + '/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        }
    }
})();