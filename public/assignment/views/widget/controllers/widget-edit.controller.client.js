(function () {
    angular
        .module("WAM")
        .controller("editWidgetController", editWidgetController);

    function editWidgetController($routeParams, widgetService, $location) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.widgetId = $routeParams['wgid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                })
        }

        init();

        function updateWidget(widget, name, text) {

            if (name === null || typeof name === 'undefined' || name === "") {
                model.message = "Name is required.";
                return;
            }
            if (text === null || typeof text === 'undefined' || text === "") {
                model.message = "Text is required.";
                return;
            }

            widgetService
                .updateWidget(widget._id, widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                })
        }

        function deleteWidget(widget) {
            widgetService
                .deleteWidget(widget._id)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

                })
        }
    }


})();