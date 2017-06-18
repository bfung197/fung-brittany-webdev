var app = require('../../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgetModel = require('../model/widget/widget.model.server');

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", orderWidgets);


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/public/uploads/'+filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl   = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/"
                        + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.send(err);
                });
        });
}

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel
        .createWidgetForPage(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        },function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req, res) {
    widgetModel
        .findWidgetById(req.params.widgetId)
        .then(function (widget) {
            res.send(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        });
}

function orderWidgets(req, res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    var pageId = req.query['pageId'];

    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}
