(function () {
    angular
        .module("WAM")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, WidgetService, $location) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.widgetId = $routeParams.wgid;
        model.pageId = $routeParams['pid'];

        function init() {
            model.widgets = WidgetService.findWidgetByPageId(model.pageId);
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }
        init();
    }
})();