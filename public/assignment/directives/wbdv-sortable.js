(function () {
    angular
        .module('wbdvDirectives', ['ngRoute'])
        .directive('wbdvSortable', wbdvSortable)

    function wbdvSortable(widgetService) {
        function linkFunction(scope, element) {
            var initial = -1;
            var final = -1;
            $(element).sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        initial = ui.item.index();
                },
                    stop: function (event, ui) {
                        var final = ui.item.index();
                        widgetService
                            .orderWidgets(initial, final);
                    }

                }
            );
        }

        return {
            link: linkFunction
        }
    }
})();