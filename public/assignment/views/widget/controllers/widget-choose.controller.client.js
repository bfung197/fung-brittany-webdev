(function () {
    angular
        .module('WAM')
        .controller('newWidgetController', newWidgetController);

    function newWidgetController($routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        // event handlers
        model.createWidget = createWidget;
        model.widgetType = widgetType;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                })
        }

        init();

        // implementation
        function widgetType(type) {
            model.type = type;
        }

        function createWidget(widget) {
            var widget = {};
            widget.type = model.type;
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();