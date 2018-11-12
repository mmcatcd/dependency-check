const fetch = require('node-fetch');

exports.getPackage = async (package) => {
  const pack = await fetch(`https://api.npms.io/v2/package/${package}`)
  return pack.json();
}