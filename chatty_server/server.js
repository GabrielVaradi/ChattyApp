// server.js
const uuidv4 = require('uuid/v4');
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

const clientList = [];

//Create a random color
const getColor = () => {
  return `#${uuidv4().slice(0, 6)}`;
};

//Broadcasts the message to all users
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

//Add a client to the client list
const addClient = (client, clientInfo) => {
  clientList[clientInfo.id] = {
    id: clientInfo.id,
    username: clientInfo.username,
    color: clientInfo.color,
  };

  client.id = clientInfo.id;
};

//Add client info and sends the info to the front-end
const connectClient = (client, nbClients) => {
  const clientId = uuidv4();

  const infoMsg = {
    id: clientId,
    username: `Anonymous${nbClients}`,
    color: getColor(),
    type: 'incomingClientInfo',
    number: wss.clients.size
  };

  addClient(client, infoMsg);

  client.send(JSON.stringify(infoMsg));
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  //When a client connect, give him an id, color and name
  connectClient(ws, wss.clients.size);
  //Send the number of connected clients to all users

  //When receiving a message from the font-end
  ws.on('message', (message) => {
    const received = JSON.parse(message);
    received.id = uuidv4();
    switch (received.type) {
      //If its a message, give it an id, a type and broadcast it
      case "postMessage":
        received.type = 'incomingMessage';
        wss.broadcast(received);
        break;
      //If its a notification, give it an id, a type and broadcast it
      case "postNotification":
        received.type = 'incomingNotification';
        wss.broadcast(received);
        break;
      //If its a username, give it an id, a color, a type and broadcast it
      case "postUsername":
        received.color = getColor();
        received.type = 'incomingUsername';
        wss.broadcast(received);
      default:
        throw new Error("Unknown event type " + data.type);
    };
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    //Send the number of connected clients to all users
    wss.broadcast({
      type: 'clientsConnected',
      number: wss.clients.size
    });
    console.log('Client disconnected');
  });
});