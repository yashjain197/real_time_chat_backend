const url = require('url');
const { v4: uuidv4 } = require('uuid');

// Function to handle incoming WebSocket messages
const handleMessage = (connection, bytes, uuid, username, connections) => {
    const message = JSON.parse(bytes.toString());
    
    // Broadcasting the message to all connected clients
    broadcast(connections, uuid, message.message, username);
};

// Function to handle WebSocket connection closure
const handleClose = (uuid, username, connections) => {
    console.log(`${username} disconnected`);
    
    // Removing the disconnected user from connections
    delete connections[uuid];
    
    // Broadcasting the updated connection status
    broadcast(connections);
};

// Function to broadcast messages to all connected clients
const broadcast = (connections, uuidOfConnectedUser, message, username) => {
    // Iterating through all connections
    Object.keys(connections).forEach(uuid => {
        const connection = connections[uuid];
        let isUserMessage = false;

        // Checking if the message is intended for a specific user
        if (uuidOfConnectedUser === uuid) {
            isUserMessage = true;
        }
        
        // Constructing the data object to be sent
        const data = {
            username,
            message,
            isUserMessage
        };
        
        // Sending the message as JSON to each connected client
        connection.send(JSON.stringify(data));
    });
};

// Function to handle new WebSocket connections
const handleConnection = (connection, request, connections) => {
    // Extracting username from the query parameters of the WebSocket request
    const { username } = url.parse(request.url, true).query;
    
    // Generating a unique identifier for the new connection
    const uuid = uuidv4();
    
    // Storing the new connection in the connections object
    connections[uuid] = connection;
    
    // Attaching event handlers for message reception and connection closure
    connection.on("message", (message) => handleMessage(connection, message, uuid, username, connections));
    connection.on('close', () => handleClose(uuid, username, connections));
};

module.exports = { handleConnection };
