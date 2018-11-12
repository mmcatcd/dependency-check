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

exports.getTopicRepos = function(topic) {
  console.log("Getting repos with topic: ", topic, "...");

  const query = gql `
    query($topic: String!) {
      search(query: $topic, type:REPOSITORY, first: 10) {
        edges {
          node {
            ... on Repository {
              name
              description
              mergeCommitAllowed
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
        }
      }
    }
  `;

  client.query({
    query: query,
    variables: {
      topic: topic
    }
  }).then(result => console.log(result));
}