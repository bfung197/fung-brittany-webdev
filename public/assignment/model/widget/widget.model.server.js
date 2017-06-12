var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;


widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidgetForPage = createWidgetForPage;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

modules.export = widgetModel;


function createWidgetForPage(pageId, widget) {

}

function findAllWidgetsForPage(pageId) {

}

function findWidgetById(widgetId) {

}

function updateWidget(widgetId, widget) {

}

function deleteWidget(widgetId) {

}

function reorderWidget(pageId, start, end) {

}
