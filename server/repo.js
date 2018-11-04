const ApolloClient = require('apollo-client').default;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const createHttpLink = require('apollo-link-http').createHttpLink;
const setContext = require('apollo-link-context').setContext;
const gql = require('graphql-tag');

const fetch = require('node-fetch');

const githubAPIURL = "https://api.github.com/graphql";

const httpLink = createHttpLink({
  uri: githubAPIURL,
  fetch
});

const authLink = setContext((_, {headers}) => {
  const token = process.env.GITHUB_ACCESS_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

exports.getRepo = function(name) {
  console.log("Getting repo with name: ", name);

  client.query({
    query: gql`
      query {
        repository(name: "Express", owner: "expressjs") {
          name
          description
          repositoryTopics(last:20) {
            edges {
              node {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    `
  }).then(result => console.log(result));
}