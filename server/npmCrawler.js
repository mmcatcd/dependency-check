const npmQueries = require('./npmQueries');
const mongoose = require('./mongodb/mongoose');
const Package = require('./mongodb/models/package');

crawl = async (packageName) => {
  let crawledPackages = [];
  await crawlPackage(packageName, crawledPackages);
}

crawlPackage = async (packageName, crawledPackages) => {
  // Check if package has already been crawled to prevent loops.
  if (crawledPackages.includes(packageName)) { return; }

  // Check if the package is in the database.
  let packageInfo = null;
  const result = await mongoose.read(Package.model, { name: packageName });

  if (result == null) {    
    // Make package name url friendly
    const packageNameURL = encodeURIComponent(packageName);

    // Grab the package from npm
    packageInfo = await npmQueries.getPackage(packageNameURL);

    // Check if no package was found
    if (packageInfo.code == "NOT_FOUND" || packageInfo.code == "INTERNAL") { return; }

    console.log("Package name: ", packageName);

    // Put the repo into the database
    const packageEntry = Package.create(packageInfo);
    await mongoose.create(packageEntry);
  } else {
    packageInfo = result.package;
  }

  // Add package to list of crawled packages to prevent loops.
  crawledPackages.push(packageName);
  console.log(packageInfo.collected.metadata.name);

  // Recursively crawl all dependency packages.
  const dependencies = packageInfo.collected.metadata.dependencies;
  for (dep in dependencies) {
      await crawlPackage(dep, crawledPackages);
  }

  // Recursively crawl all dev-dependency packages.
  const devDependencies = packageInfo.collected.metadata.devDependencies;
  for (dep in devDependencies) {
    await crawlPackage(dep, crawledPackages);
  }
}

/*
const sleep = (millis) => {
  return new Promise(resolve => setTimeout(resolve, millis));
}*/

module.exports.crawlPackage = crawlPackage;
module.exports.crawl = crawl;