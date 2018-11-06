/** 
 * Maps each query to a function that fetches the required data to resolve the query.
*/

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

module.exports = resolvers;