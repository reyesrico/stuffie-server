import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer();
server.listen(8080);
console.log('Listening on port 8080');

const socket = new WebSocketServer({ server });

let clients = {};

const getUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
}

socket.on('connection', connection => {
  let userId = getUniqueId();
  clients[userId] = connection;
  console.log(`${new Date()} recieved a new connection`);

  connection.on('message', message => {

    // Broadcasting message to all connected clients
    Object.keys(clients).forEach(key => {
      clients[key].send(message);
    });
  });
});
