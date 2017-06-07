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

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets;
                })
        }

        init();

        // implementation
        function createWidget(widget, widgetType) {
            widget.pageId = model.pageId;
            widget.widgetType = widgetType;
            widgetService
                .createWidget(widget)
                .then(function() {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                })
        }
    }
})();