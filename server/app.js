const express = require('express');
const app = express();
const mongoose = require('./mongodb/mongoose');
const routes = require('./api/routes');

const morgan = require('morgan');

// Console logging
app.use(morgan('dev'));

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dep-check')
.then(() => console.log("Connected to Mongo db."));

// Successful request response
app.use(express.Router().get('/', (req, res, next) => {
  res.status(200).json({
    message: "You've found Dependency Check web server.",
    IP: req.connection.remoteAddress,
    graphQLPath: apolloServer.graphqlPath
  });
}));

module.exports = app;