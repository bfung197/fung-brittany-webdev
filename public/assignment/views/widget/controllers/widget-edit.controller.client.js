(function() {
    angular
        .module("WAM")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, WidgetService,$location) {
        var model = this;
        var userId = $routeParams["userId"];
        var widgetId = $routeParams.widgetId;

        function init() {
            model.user = WidgetService.findAllWidgetsForUser(model.userId);
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }
        init();
    }
})();