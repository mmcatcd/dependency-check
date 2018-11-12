const express = require('express');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./mongodb/mongoose');
const npmCrawler = require('./npmCrawler');

const morgan = require('morgan');

const typeDefs = require('./graphql/schema'); // Import GraphQL schema
const resolvers = require('./graphql/resolvers'); // Import GraphQL query resolvers

// Create a new Apollo Server with Express middleware.
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

// Console logging
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dep-check')
.then(() => {
  // Do a crawl of NPM.
  console.log("Starting crawl of express...");
  npmCrawler.crawl('express')
  .then(() => console.log("Finished crawl!"));
});

// Successful request response
app.use(express.Router().get('/', (req, res, next) => {
  res.status(200).json({
    message: "You've found Dependency Check web server.",
    IP: req.connection.remoteAddress,
    graphQLPath: apolloServer.graphqlPath
  });
}));

module.exports = app;
module.exports.apolloServer =  apolloServer;