const mongoose = require('mongoose');

// Schema for every package in package collection.
const Crawl = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  packageName: String,
  crawl: Object
});

const model = mongoose.model('Crawl', Crawl);

// Creates new instance of the model.
exports.create = (packageName, crawlResults) => {
  console.log("Creating new entry: ", packageName, "with: ", crawlResults);
  return new model({
    _id: mongoose.Types.ObjectId(),
    packageName: packageName,
    crawl: crawlResults
  });
}

module.exports.model = model;