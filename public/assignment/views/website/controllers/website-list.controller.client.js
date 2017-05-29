(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
        }

        init();
    }
})();