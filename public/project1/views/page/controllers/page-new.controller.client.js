(function () {
    angular
        .module('WAM')
        .controller('newPageController', newPageController);

    function newPageController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        // event handlers
        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(renderPages())
        }
        init();

        // implementation
        function createPage(page, name) {

            if(name === null || typeof name==='undefined'){
                model.message="Name is required.";
                return;
            }

            pageService
                .createPage(model.websiteId, page)
                .then(function(page) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                });
        }

        function renderPages(pages) {
            model.pages = pages;
        }
    }
})();