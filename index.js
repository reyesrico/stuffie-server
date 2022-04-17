const server = require('http').createServer();
const WebSocket = require('ws');

server.listen(8080);
console.log('Listening on port 8080');

const socket = new WebSocket.Server({ server:server });

socket.on('connection', ws => {
  ws.send('Welcome!!!');

  ws.on('message', (data, isBinary) => {

    ws.send('Thanks');
    const message = isBinary ? data : data.toString();
    console.log(`Messsage Received: ${message}`);
    console.log(typeof message);

    // Broadcasting message to all connected clients
    socket.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    // console.log(`Client ${userId} has disconnected`);
    // delete clients.userId;
  });
});
