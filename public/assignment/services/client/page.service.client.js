(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {


        return {
            createPage: createPage,
            findAllPagesForWebsite: findAllPagesForWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePage(pageId) {
            var url ="/api/page/" + pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/"+ websiteId +"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();