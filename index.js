// Importing required modules
const http = require('http');
const { setupWebSocketServer } = require('././config/websocket'); // Importing WebSocket setup function from websocket.js

// Defining the port on which the server will listen
const port = 8000;

// Creating an HTTP server instance
const server = http.createServer();

// Setting up WebSocket server by passing the HTTP server instance
setupWebSocketServer(server);

// Starting the HTTP server to listen on the specified port
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});
