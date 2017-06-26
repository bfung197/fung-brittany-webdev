var app = require('../../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var postModel = require('../model/post/post.model.server');

app.post('/api/user/:userId/post', createPost);
app.get('/api/user/:userId/posts', findAllPostsforUser);
app.get('/api/post/:postId', findPostById);
app.put('/api/post/:postId', updatePost);
app.delete('/api/post/:postId', deletePost);
app.post ("/api/post/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var postId      = req.body.postId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    postModel
        .findPostById(postId)
        .then(function (post) {
            post.url = '/public/uploads/'+filename;
            postModel
                .updatePost(postId, post)
                .then(function () {
                    res.redirect("/project/index.html#!/user/" + userId + "/post/" + postId);
                }, function (err) {
                    res.send(err);
                });
        });
}

function createPost(req, res) {
    var userId = req.params['userId'];
    var post = req.body;
    postModel
        .createPostForUser(userId, post)
        .then(function (post) {
            res.json(post);
        });
}

function findAllPostsforUser(req, res) {
    var userId = req.params['userId'];

    postModel
        .findAllPostsForUser(userId)
        .then(function (posts) {
            res.json(posts);
        },function (err) {
            res.sendStatus(404);
        });
}

function findPostById(req, res) {
    postModel
        .findPostById(req.params.postId)
        .then(function (post) {
            res.send(post);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updatePost(req, res) {
    var postId = req.params['postId'];
    var post = req.body;

    postModel
        .updatePost(postId, post)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deletePost(req, res) {
    var postId = req.params['postId'];

    postModel
        .deletePost(postId)
        .then(function () {
            res.sendStatus(200);
        });
}