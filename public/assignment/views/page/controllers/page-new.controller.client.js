(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);

    function newPageController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        // event handlers
        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(websiteId);
        }
        init();

        // implementation
        function createPage(page) {
            page.websiteId = websiteId;
            pageService.pageWebsite(page);
            $location.url('/user/'+userId+'/website/'+websiteId+'/page');
        }
    }
})();