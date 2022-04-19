// Using WebSockets on Heroku
// https://devcenter.heroku.com/articles/node-websockets

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';
console.log(`Listening on port 1 ${PORT}`);

const server = express()
  .use((_, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening 2 on  ${PORT}`));

const socket = new Server({ server });

socket.on('connection', ws => {
  ws.send('"Client connected"');
  console.log(`clients connected ${socket.clients.size}`);

  // Receives and sends strings
  // Client should parse info
  ws.on('message', message => {
    console.log(`Messsage Received: ${message}`);

    // Broadcasting message to all connected clients
    socket.clients.forEach(client => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      // }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    // console.log(`Client ${userId} has disconnected`);
    // delete clients.userId;
  });
}, 1000);
