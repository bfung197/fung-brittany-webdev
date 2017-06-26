(function () {
    angular
        .module('WAM')
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController(flickrService, postService, $location, $routeParams) {

        var model = this;


        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            model.userId = $routeParams.uid;
            model.postId = $routeParams.poid;

            postService
                .findPostById(model.postId)
                .then(function(response) {
                    model.post = response;
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
            model.post.url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            postService
                .updatePost(model.postId, model.post)
                .then(goToPosts);
        }

        function goToPosts() {
            $location
                .url('/user/' + model.userId);
        }

    }
})();