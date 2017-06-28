var mongoose = require('mongoose');
var websiteModel = require('../../model/website/website.model.server');
var pageSchema = require('./page.schema.server');

var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPageForWebsite = createPageForWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPageForWebsite(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function(page) {
            return websiteModel
                .addPage(websiteId, page._id)
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pageId) {
    return pageModel
        .findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel
        .update({_id: pageId}, {
            $set : {
                _website: page._website,
                name: page.name,
                title: page.title,
                description: page.description,
            }
        });

}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .removePage(websiteId, pageId);
        });
}