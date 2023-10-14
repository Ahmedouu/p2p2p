import { WebSocketServer } from 'ws'
import { getPrivateIP } from './privateIP.js';
const pIp = getPrivateIP()
const wss = new WebSocketServer({host: pIp,  port: 443  });

let clients = {};

wss.on('connection', function connection(ws) {
  let id = Math.random();
  clients[id] = ws;
  console.log("New connection " + id);

  ws.on('message', function(message) {
    console.log('received: %s from %s', message, id);

    for(let clientId in clients) {
      clients[clientId].send(`Message: ${message} from ${id}`);
    }
  });

  ws.on('close', function() {
    console.log('Connection closed ' + id);
    delete clients[id];
  });
});