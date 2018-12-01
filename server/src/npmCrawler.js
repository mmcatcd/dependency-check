const npmQueries = require('./npmQueries');
const mongoose = require('./mongodb/mongoose');
const Package = require('./mongodb/models/package');
const Crawl = require('./mongodb/models/crawl');

crawl = async (packageName) => {
  // Check if crawl results exists in the database for the package
  const dbCrawl = await mongoose.read(Crawl.model, { packageName: packageName });

  if (dbCrawl != null) {
    return dbCrawl.crawl;
  } else {
    let crawledPackages = [];
    let crawlResults = { nodes: [], links: [] }
    let group = 0;

    await crawlPackage(packageName, crawledPackages, crawlResults, group);
    const crawlMongo = Crawl.create(packageName, crawlResults);
    await mongoose.create(crawlMongo);

    return crawlResults;
  }
}

crawlPackage = async (packageName, crawledPackages, crawlResults, group) => {
  // Add to nodes
  let isUnique = true;
  crawlResults.nodes.map((node) => { 
    if (node.id == packageName) isUnique = false; 
  });

  if (isUnique) {
    crawlResults.nodes.push({
      id: packageName,
      group: group
    });
  }

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
      crawlResults.links.push({
        source: packageName,
        target: dep
      });

      await crawlPackage(dep, crawledPackages, crawlResults, group++);
  }

  // Recursively crawl all dev-dependency packages.
  /*
  const devDependencies = packageInfo.collected.metadata.devDependencies;
  for (dep in devDependencies) {
    await crawlPackage(dep, crawledPackages);
  }*/
}

module.exports.getPackage = async (packageName) => {
  // Check if the package is in the database.
  const result = await mongoose.read(Package.model, { name: packageName });

  if (result == null) {
    // Grab the package from npm
    result = await npmQueries.getPackage(packageNameURL);
  }

  return result;
}

module.exports.crawlPackage = crawlPackage;
module.exports.crawl = crawl;