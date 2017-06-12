var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer1_2017');
mongoose.Promise = require('q').Promise;


websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

modules.export = websiteModel;


function createWebsiteForUser(userId, website) {

}

function findAllWebsitesForUser(userId) {

}

function findWebsiteById(websiteId) {

}

function updateWebsite(websiteId, website) {

}

function deleteWebsite(websiteId) {

}
