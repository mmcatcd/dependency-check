const fetch = require('node-fetch');

exports.getPackage = async (package) => {
  const packageResult = await fetch(`https://api.npms.io/v2/package/${package}`);
  return packageResult.json();
}