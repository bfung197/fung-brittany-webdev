(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams, postService, $sce) {

        var model = this;
        model.postId = $routeParams['poid'];
        model.updateUser = updateUser;
        model.logout = logout;
        model.createPost = createPost;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getPostUrlForType = getPostUrlForType;
        model.unregister = unregister;

        function init() {
            renderUser(currentUser);
            postService
                .findAllPostsforUser(currentUser._id)
                .then(function(posts) {
                    model.posts = posts;
                })
        }
        init();


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

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/login');
                })
        }

        function logout() {
            userService
                .logout()
                .then(
                    function () {
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
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': currentUser._id, 'size': '', 'text': '', 'order': 1000};
                    break;
                case "IMAGE":
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': currentUser._id, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                case "YOUTUBE":
                    post =  {'_id' : model.postId, 'name': '', 'type': postType, '_user': currentUser._id, 'width': '', 'url': '', 'text': '', 'order': 1000};
                    break;
                default:
                    break;
            }

            postService
                .createPost(currentUser._id, post)
                .then(function(post) {
                    $location.url('/profile/post/' + post._id);
                });
        }
    }
})();