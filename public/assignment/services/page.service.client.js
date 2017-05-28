(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "PageId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "PageId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "PageId": "456", "description": "Lorem" }
        ];


        return {
            createPage: createPage,
            findAllPagesForUser: findAllPagesForUser,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(Page) {
            Page._id = (new Date()).getTime() + "";
            Page.created = new Date();
            Page.updated = new Date();
            Pages.push(Page);
        }

        function updatePage(PageId, Page) {

        }

        function deletePage(PageId) {
            var Page = Pages.find(function (Page) {
                return Page._id === PageId;
            });
            var index = Pages.indexOf(Page);
            Pages.splice(index, 1);
        }

        function findPageById(PageId) {
            return Pages.find(function (Page) {
                return Page._id === PageId;
            });
        }

        function findAllPagesForUser(userId) {
            var resultSet = [];
            for(var p in Pages) {
                if(Pages[p].developerId === userId) {
                    resultSet.push(Pages[p]);
                }
            }
            return resultSet;
        }
    }
})();