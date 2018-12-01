const express = require('express');
const app = express();
const mongoose = require('./mongodb/mongoose');
const routes = require('./api/routes');

const morgan = require('morgan');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
mongoose.connect('mongodb://db:27017/dep-check')
.then(async (err) => {
  if (err) {
    console.log("Couldn't connect. Waiting 10 seconds...")
    await sleep(10000)
    console.log("Trying again...")
    mongoose.connect('mongodb://db:27017/dep-check')
    .then((err) => {
      if (err) {
        console.log("Failed second time around too :(")
      } else {
        console.log("Connected to MongoDB!")
      }
    })
  } else {
    console.log("Connected to MongoDB!")
  }
});

// Successful request response
app.use(express.Router().get('/', (req, res, next) => {
  res.status(200).json({
    message: "You've found Dependency Check web server.",
    IP: req.connection.remoteAddress,
  });
}));

module.exports = app;