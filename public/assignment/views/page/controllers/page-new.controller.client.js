(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);

    function newPageController($routeParams,
                               pageService,
                               $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();

        // implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();