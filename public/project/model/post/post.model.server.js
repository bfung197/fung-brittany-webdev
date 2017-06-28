var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var userModel = require('../../model/user/user.model.server');


var postModel = mongoose.model('postModel', postSchema);

postModel.createPostForUser = createPostForUser;
postModel.findAllPostsForUser = findAllPostsForUser;
postModel.findPostById = findPostById;
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;

module.exports = postModel;

function createPostForUser(userId, post) {
    post._user = userId;
    return postModel
        .create(post)
        .then(function (post) {
            userModel
                .findUserById(userId)
                .then(function (user) {
                    user.posts.push(post._id);
                    user.save();
                });
            return post;
        });
}

function findAllPostsForUser(userId) {
    return postModel
        .find({_user: userId})
        .populate('_user', 'name')
        .exec();
}

function findPostById(postId) {
    return postModel
        .findOne({_id: postId});
}

function updatePost(postId, post) {
    return postModel
        .update({_id: postId}, {
            $set : {
                name: post.name,
                text: post.text,
                placeholder: post.placeholder,
                description: post.description,
                url: post.url,
                width: post.width,
                height: post.height,
                rows: post.rows,
                size: post.size,
                deleteTable: post.deleteTable,
                formatted: post.formatted
            }
        });

}

function deletePost(postId) {
    return postModel
        .remove({_id: postId})
        .then(function () {
            userModel
                .findOne({posts: postId})
                .then(function (user) {
                        var index = user.posts.indexOf(postId);
                        user.posts.splice(index, 1);
                        user.save();
                    }
                );
        });
}