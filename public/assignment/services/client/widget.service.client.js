(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        return {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            uploadImage: uploadImage,
            orderWidgets: orderWidgets
        };

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWidget(widgetId) {
            var url ="/api/widget/" + widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/"+ pageId +"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadImage() {
            var url ="/api/upload";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function orderWidgets(initial, final, pageId) {
            var url = "/page/" + pageId + "/widget?initial=" + initial +"&final=" + final;
            return $http.put(url)
        }
    }
})();