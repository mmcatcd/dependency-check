const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schema'); // Import GraphQL schema
const resolvers = require('./graphql/resolvers'); // Import GraphQL query resolvers

// Create a new Apollo Server with Express middleware.
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

module.exports = app;
module.exports.apolloServer = apolloServer;