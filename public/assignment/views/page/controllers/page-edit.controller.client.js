(function () {
    angular
        .module('WAM')
        .controller('editPageController', editPageController);

    function editPageController($routeParams,
                                pageService,
                                $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function(page) {
                    model.page = page;
                });
        }

        init();

        // implementation

        function updatePage(page, name) {
            if(name === null || typeof name==='undefined' || name === ""){
                model.message="Name is required.";
                return;
            }

            pageService
                .updatePage(page._id, page)
                .then(goToPages())
        }

        function goToPages() {
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                })
        }
    }
})();