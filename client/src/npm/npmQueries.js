export const getPackage = async (packageName) => {
  const result = await fetch(`https://api.npms.io/v2/package/${packageName}`);
  return result.json();
}

export const searchPackage = async (packageName, size) => {
  const result = await fetch(`https://api.npms.io/v2/search?q=${packageName}&size=${size}`);
  return result.json();
}