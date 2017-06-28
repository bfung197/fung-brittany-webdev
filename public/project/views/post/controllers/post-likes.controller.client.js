(function () {
    angular
        .module("WAM")
        .controller("likePostController", likePostController);

    function likePostController($routeParams, userService) {
        var model = this;
        model.userId = $routeParams["uid"];
        model.postId = $routeParams['poid'];

        model.likePost = likePost;

        function init() {
            userService
                .findAllLikesForPost(model.postId)
                .then(function (likes) {
                    model.likes = likes;
                }, model.message = "No likes yet.");
        }

        init();

        function likePost() {
            userService
                .likePost(model.postId, model.userId)
                .then(function() {
                    model.message = "Post liked!";
                })
        }

    }


})();