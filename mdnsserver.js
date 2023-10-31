import mdns from 'multicast-dns';
import { getPrivateIP } from './utils/privateIP.js';
import {WebSocketServer} from 'ws';
/*Demo PING PONG to test MDNS + WEBSOCKETS BEFORE ADDING LIBP2P*/
const pIp = getPrivateIP();

const wss = new WebSocketServer({ host: pIp, port: 8080 });
const mdnsInstance = mdns();

mdnsInstance.on('query', async function(query) {
  if (query.questions[0] && query.questions[0].name === 'peepee-server.local') {
    console.log("You have found Me");
    console.log(query);
    await mdnsInstance.respond({
      answers: [{
        name: 'peepee-server.local',
        type: 'A',
        data: pIp,
      }]
    });
  }
});
/* we don't have a problem here with establish connection ubuntu server windows client*/
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Continuously exchange data with the client
  const interval = setInterval(() => {
    ws.send('Server: Ping');
  }, 1000);

  ws.on('message', (message) => {
    console.log(`Received from client: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
console.log('Server is broadcasting the service');