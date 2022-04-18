// Using WebSockets on Heroku
// https://devcenter.heroku.com/articles/node-websockets

const express = require('express');
const { Server } = require('ws');

// const server = require('http').createServer();
// const WebSocket = require('ws');


const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';
// server.listen(8080);
console.log(`Listening on port 1 ${PORT}`);

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening 2 on  ${PORT}`));

const socket = new Server({ server });

socket.on('connection', ws => {
  ws.send('Client connected');

  ws.on('message', (data, isBinary) => {

    ws.send('Thanks');
    const message = isBinary ? data : data.toString();
    console.log(`Messsage Received: ${message}`);
    console.log(typeof message);

    console.log(`clients connected ${socket.clients.size}`);
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
