const mongoose = require('mongoose');

// Connect to MongoDB
exports.connect = async (url) => {
  try {
    await mongoose.connect(
      url,
      { useNewUrlParser: true }
    )
  } catch(err) {
    console.log("Couldn't connect to MongoDB: ", err);
  }

  console.log("MongoDB Connected to:", mongoose.connection.db.s.databaseName);
}

/**
 * Create.
 * Saves a model. Returns an error if there is one.
 * If all is well, returns null. 
 */
exports.create = async (obj) => {
  return await obj.save((err) => {
    if (err) return err;
    else return null;
  });
}

/**
 * Read.
 * Searches for model instance. If none found returns null.
 * Otherwise returns one object found.
 */
exports.read = async (model, obj) => {
  return await model.findOne(obj, (err, resObj) => {
    if (err) return null;
    else return resObj;
  });
}

/**
 * ReadAll.
 * Searches for all instances of a model. If none found returns null.
 * Otherwise returns all instances of the object found.
 */
exports.readAll = async (model) => {
  return await model.find({}, (err, objs) => {
    if (err) return null;
    else return objs;
  });
}

/**
 * Delete.
 * Finds a user from a given object and then removes them.
 * Returns error if no user found or failed to remove.
 * Otherwise returns null.
 */
exports.delete = async (model, obj) => {
  return await model.findOne(obj, (err, resObj) => {
    if (err) return err;

    // Delete object
    resObj.remove((err) => {
      if (err) return err;
      else return null;
    });
  })
}