(function () {
    angular
        .module('WAM')
        .controller('editPageController', editPageController);

    function editPageController($routeParams,
                                   websiteService,
                                   $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams.pageId;

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.pages = websiteService.findAllPagesForUser(model.websiteId);
            model.pages = websiteService.findPageById(model.pageId);
        }
        init();

        // implementation
        function createPage(page) {
            page.developerId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }

        function updatePage(page) {
            pageService.updatePage();
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
        }
    }
})();