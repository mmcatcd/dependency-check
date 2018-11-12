const npmQueries = require('./npmQueries');
const mongoose = require('./mongodb/mongoose');
const Package = require('./mongodb/models/package');

crawlPackage = async (packageName) => {
  // Check if the package is in the database.
  const result = await mongoose.read(Package.model, { name: packageName });
  if (result != null) { return };

  // Grab the package from npm
  const packageInfo = await npmQueries.getPackage(packageName);

  // Put the repo into the database
  const packageEntry = Package.create(packageInfo);
  await mongoose.create(packageEntry);

  // Recursively crawl all dependency packages.
  const dependencies = packageInfo.collected.metadata.dependencies;
  for (dep in dependencies) {
    await crawlPackage(dep);
  }
}

module.exports.crawlPackage = crawlPackage;