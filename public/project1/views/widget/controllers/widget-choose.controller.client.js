(function () {
    angular
        .module('WAM')
        .controller('newWidgetController', newWidgetController);

    function newWidgetController($routeParams, widgetService, $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.widgetId = $routeParams['wgid'];

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

        function createWidget(widgetType) {
            switch (widgetType) {
                case "HEADING":
                    widget =  {'_id' : model.widgetId, 'name': '', 'type': widgetType, '_page': model.pageId, 'size': '', 'text': '', 'order': 1000};
                    break;
                case "IMAGE":
                    widget =  {'_id' : model.widgetId, 'name': '', 'type': widgetType, '_page': model.pageId, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                case "YOUTUBE":
                    widget =  {'_id' : model.widgetId, 'name': '', 'type': widgetType, '_page': model.pageId, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                case "TEXT":
                    widget =  {'_id' : model.widgetId, 'name': '', 'type': widgetType, '_page': model.pageId, 'rows': '', 'placeholder': '', 'formatted': '', 'order': 1000};
                    break;
                case "HTML":
                    widget =  {'_id' : model.widgetId, 'name': '', 'type': widgetType, '_page': model.pageId, 'text': '', 'order': 1000};
                    break;
                default:
                    break;
            }

            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }
    }
})();