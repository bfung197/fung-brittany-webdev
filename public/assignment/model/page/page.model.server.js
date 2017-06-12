var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;


pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPageForWebsite = createPageForWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

modules.export = pageModel;


function createPageForWebsite(websiteId, page) {

}

function findAllPagesForWebsite(websiteId) {

}

function findPageById(pageId) {

}

function updatePage(pageId, page) {

}

function deletePage(pageId) {

}
