import mdns from 'multicast-dns';
import { WebSocketServer } from 'ws'
import {getPrivateIP}  from './privateIP.js';
const pIp = getPrivateIP()
const wss = new WebSocketServer({host: pIp,  port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('WebSocket server connected!');
});

// Advertise WebSocket server
mdns().on('query', function(query) {
  if (query.questions[0] && query.questions[0].name === 'my-websocket-server.local') {
    console.log("You have found Me")
    mdns().respond({
      answers: [{
        name: 'my-websocket-server.local',
        type: 'A',
        data: pIp // replace with your server's IP address
      }]
    });
  }
});