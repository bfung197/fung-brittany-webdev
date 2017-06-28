(function () {
    angular
        .module('WAM')
        .factory('postService', postService);

    function postService($http) {

        return {
            createPost: createPost,
            findAllPostsforUser: findAllPostsforUser,
            findPostById : findPostById,
            updatePost: updatePost,
            deletePost: deletePost,
            uploadImage: uploadImage
        };

        function createPost(userId, post) {
            var url = "/api/user/" + userId + "/post";
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePost(postId, post) {
            var url = "/api/post/" + postId;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                })
        }

        function deletePost(postId) {
            var url = "/api/post/" + postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findPostById(postId) {
            var url = "/api/post/" + postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPostsforUser(userId) {
            var url = "/api/user/" + userId + "/posts";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function uploadImage() {
            var url = "/api/post/upload";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();