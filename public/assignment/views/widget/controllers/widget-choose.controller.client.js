(function () {
    angular
        .module('WAM')
        .controller('newWidgetController', newWidgetController);

    function newWidgetController($routeParams,
                               widgetService,
                               $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        // event handlers
        model.createWidget = createWidget;

        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
        }
        init();

        // implementation
        function createWidget(widget) {
            widget.pageId = model.pageId;
            widgetService.widgetWebsite(page);
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page'+model.pageId+'/widget'+widget._id);
        }
    }
})();