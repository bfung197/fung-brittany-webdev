(function () {
    angular
        .module("WAM")
        .controller("editPostController", editPostController);

    function editPostController(currentUser, $routeParams, postService, $location) {
        var model = this;
        model.postId = $routeParams['poid'];

        model.updatePost = updatePost;
        model.deletePost = deletePost;

        function init() {
            postService
                .findAllPostsforUser(currentUser._id)
                .then(function (posts) {
                    model.posts = posts;
                });
            postService
                .findPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                })
        }

        init();

        function updatePost(post, name, text) {

            if (name === null || typeof name === 'undefined' || name === "") {
                model.message = "Name is required.";
                return;
            }
            if (text === null || typeof text === 'undefined' || text === "") {
                model.message = "Text is required.";
                return;
            }

            postService
                .updatePost(post._id, post)
                .then(function () {
                    $location.url('/profile');
                })
        }

        function deletePost(post) {
            postService
                .deletePost(post._id)
                .then(function () {
                    $location.url('/profile');

                })
        }
    }


})();