(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {

        var key = "a4860efc047c4191ad63d59769ef040c";
        var secret = "0b4e0c6359818262";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();