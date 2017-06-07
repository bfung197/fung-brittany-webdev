var app = require('../../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../../public/uploads' });

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", orderWidgets);

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {"_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"},
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


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

    widget = findWidgetById(widgetId);
    widget.url = '/../../../public/uploads/'+filename;

    var callbackUrl   = '/assignment/index.html#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;

    res.redirect(callbackUrl);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.created = new Date();
    widget.updated = new Date();
    widgets.push(widgets);
    res.send(widgets);
}

function findAllWidgetsForPage(req, res) {
    var resultSet = [];
    for (var w in widgets) {
        if (widgets[w].pageId === req.params['pageId']) {
            resultSet.push(widgets[w]);
        }
    }
    res.json(resultSet);
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    res.json(widget);
}

function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params['widgetId'];
    for (var w in widgets) {
        if (widgetId === widgets[w]._id) {
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}

function orderWidgets(req, res) {
    var initial = req.query['initial'];
    var widget = widgets[initial];
    var final = req.query['final'];
    widgets.splice(initial, 1);
    widgets.splice(widget, final, 0);

}
