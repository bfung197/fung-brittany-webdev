var app = require('../../../express');
var pageModel = require('../model/page/page.model.server');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page._website = websiteId;
    pageModel
        .createPageForWebsite(websiteId, page)
        .then(function(page) {
            res.json(page);
        });
}


function findAllPagesForWebsite(req, res) {
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;
    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            res.json(status);
        });
}