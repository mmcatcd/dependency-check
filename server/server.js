const http = require('http'); // Importing Node web server
const app = require('./app'); // Importing Express app

// Setting port to run web server
const port = process.env.PORT || 8000;

// Creating web server instance with express app
const server = http.createServer(app);

// Starting web server instance on port
server.listen({port}, () => {
  console.log(`Server is read at http://localhost:${port}`);
});