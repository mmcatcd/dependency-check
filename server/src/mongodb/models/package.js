const mongoose = require('mongoose');

// Schema for every package in package collection.
const Package = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  package: Object
});

const model = mongoose.model('Package', Package);

// Creates new instance of the model.
exports.create = (obj) => {
  return new model({
    _id: mongoose.Types.ObjectId(),
    name: obj.collected.metadata.name,
    package: obj
  });
}

module.exports.model = model;