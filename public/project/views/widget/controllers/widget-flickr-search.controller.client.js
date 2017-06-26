(function () {
    angular
        .module('WAM')
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController(flickrService, widgetService, $location, $routeParams) {

        var model = this;


        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            model.pageId = $routeParams.pid;
            model.widgetId = $routeParams.wgid;

            widgetService
                .findWidgetById(model.widgetId)
                .then(function(response) {
                    model.widget = response;
                });
        }
        init();

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            model.widget.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(goToWidgets);
        }

        function goToWidgets() {
            $location
                .url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }

    }
})();