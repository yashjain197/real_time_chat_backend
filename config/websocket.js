// Importing the required modules
const { WebSocketServer } = require('ws');
const { handleConnection } = require('../handlers/handler'); // Importing the handleConnection function from the handlers module

// Object to store connections
const connections = {};

// Function to set up WebSocket server
const setupWebSocketServer = (server) => {
    // Creating a WebSocket server instance using the provided HTTP server
    const wsServer = new WebSocketServer({ server });

    // Event handler for incoming connections
    wsServer.on('connection', (connection, request) => {
        // Handling the incoming connection by passing it to the handleConnection function
        handleConnection(connection, request, connections);
    });
};

// Exporting the setupWebSocketServer function and the connections object
module.exports = { setupWebSocketServer, connections };
