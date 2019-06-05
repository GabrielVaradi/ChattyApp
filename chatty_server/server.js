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

const clientList = []

const getColor = () => {
  return `#${uuidv4().slice(0, 6)}`;
};

    wss.broadcast = function broadcast(data) {

      wss.clients.forEach(function each(client) {
        //if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));


      });
    };


const addClient = (client, clientInfo) => {
  clientList[clientInfo.id] = {
    id: clientInfo.id,
    username: clientInfo.username,
    color: clientInfo.color,
  };

  client.id = clientInfo.id;
};

const connectClient = (client, nbClients) => {
  const clientId = uuidv4();

  const infoMsg = {
    id: clientId,
    username: `Anonymous${nbClients}`,
    color: getColor(),
    type: 'incomingClientInfo',
  };

  addClient(client, infoMsg);

  client.send(JSON.stringify(infoMsg));
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  connectClient(ws, wss.clients.size);
  console.log(clientList);
  wss.broadcast({type: 'clientsConnected', number: wss.clients.size})
  ws.on('message', (message) => {
    const received = JSON.parse(message)
    if(received.type === 'postMessage'){
    received.id = uuidv4()
    received.type = 'incomingMessage'
    wss.broadcast(received)
    }
    else if (received.type === 'postNotification') {
    received.id = uuidv4()
    received.type = 'incomingNotification'
    wss.broadcast(received)
    }
    else if (received.type === 'postUsername') {
    received.id = uuidv4()
    received.color = getColor()
    received.type = 'incomingUsername'
    wss.broadcast(received)
    }

  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast({type: 'clientsConnected', number: wss.clients.size})
    console.log('Client disconnected')});

});

