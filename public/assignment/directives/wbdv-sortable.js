(function () {
    angular
        .module('wbdvDirectives', ['WAM'])
        .directive('wbdvSortable', wbdvSortable)

    function wbdvSortable(widgetService) {
        function linkFunction(scope, element) {
            var initial = 0;
            $(element).sortable({
                cursor: move
            },
                {
                    start: function(event, ui) {
                        initial = $("this").index(ui.item);
                    }
                },
                {
                    stop: function(event, ui) {
                        var final = $("this").index(ui.item);
                        widgetService.orderWidgets(initial, final);
                    }

                }
            );
        }

        return {
            link: linkFunction
        }
    }
})();