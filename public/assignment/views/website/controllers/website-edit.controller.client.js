(function () {
    angular
        .module('WAM')
        .controller('editWebsiteController', editWebsiteController);

    function editWebsiteController($routeParams,
                                   websiteService,
                                   $location) {

        var model = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(userId);
            model.website = websiteService.findWebsiteById(websiteId);
        }
        init();

        // implementation

        function updateWebsite(website) {
            websiteService.updateWebsite();
            $location.url('/user/'+userId+'/website');
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/'+userId+'/website');
        }
    }
})();