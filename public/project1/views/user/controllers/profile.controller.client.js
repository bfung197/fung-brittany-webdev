
(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams, postService, $sce) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.postId = $routeParams['poid'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;
        model.createPost = createPost;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getPostUrlForType = getPostUrlForType;

        function init() {
            postService
                .findAllPostsforUser(model.userId)
                .then(function(posts) {
                    model.posts = posts;
                })
        }
        init();

        userService
            .findUserById(model.userId)
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully.";
                })
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                })
        }

        function logout() {
            userService
                .logout()
                .then(
                    function (response) {
                        $location.url('/');
                    })
        }

        function getPostUrlForType(type) {
            return 'views/post/templates/views/post-' + type.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function createPost(postType) {
            switch (postType) {
                case "HEADING":
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': model.userId, 'size': '', 'text': '', 'order': 1000};
                    break;
                case "IMAGE":
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': model.userId, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                case "YOUTUBE":
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': model.userId, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                default:
                    break;
            }

            postService
                .createPost(model.userId, post)
                .then(function(post) {
                    $location.url('/user/' + model.userId + "/post/" + post._id);
                });
        }
    }
})();