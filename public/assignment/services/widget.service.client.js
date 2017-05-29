(function () {
    angular
        .module('WAM')
        .factory('WidgetService', WidgetService);

    function WidgetService() {

        var widgets = [
                { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ]
        ;

        return {
            createWidget: createWidget,
            findWidgetByPageId: findWidgetByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };

        function createWidget(widget) {
            widget._id = (new Date()).getTime() + "";
            widget.created = new Date();
            widget.updated = new Date();
            widgets.push(Widget);
        }

        function updateWidget(widgetId, widget) {

        }

        function findWidgetById(widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function deleteWidget(widgetId) {
            var Widget = widgets.find(function (widget) {
                return widget._id === widgetId;
            });
            var index = Widgets.indexOf(Widget);
            widgets.splice(index, 1);
        }

        function findWidgetByPageId(pageId) {
            return widgets.find(function (widget) {
                return widget.pageId === pageId;
            });
        }
    }
})();