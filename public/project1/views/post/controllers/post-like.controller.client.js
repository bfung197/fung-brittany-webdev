(function () {
    angular
        .module("WAM")
        .controller("likePostController", likePostController);

    function likePostController(currentUser, $routeParams, postService, $location) {
        var model = this;
        model.postId = $routeParams['poid'];

        function init() {
            postService
                .findAllLikesForPost(model.postId)
                .then(function (likes) {
                    if(likes.size = 0) {
                        model.message = "No likes yet!";
                    }
                    model.likes = likes;
                });
        }

        init();

    }
})();