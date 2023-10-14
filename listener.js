/* eslint-disable no-console */
//le-peepee stuff
import { createFromJSON } from '@libp2p/peer-id-factory'
import { createLibp2p } from './libp2p.js'
import peerIdListenerJson from './peer-id-listener.js'
import { stdinToStream, streamToConsole } from './stream.js'
//mdns + websockets
import mdns from 'multicast-dns';
import { WebSocketServer } from 'ws'
import {getPrivateIP}  from './privateIP.js';
const pIp = getPrivateIP()
const wss = new WebSocketServer({host: pIp,  port: 8080 });
let multiaddr = null

async function run(){

 // Create a new libp2p node with the given multi-address
    const idListener = await createFromJSON(peerIdListenerJson)
    const nodeListener = await createLibp2p({
    peerId: idListener,
    addresses: {
          listen: [`/ip4/${pIp}/tcp/66666`]
        }
        })  
  // Peer Connect
    nodeListener.addEventListener('peer:connect', (evt) => {
          const remotePeer = evt.detail
          console.log('connected to: ', remotePeer.toString())
})
// Message Handler
    await nodeListener.handle('/chat/1.0.0', async ({ stream }) => {
          stdinToStream(stream)
          streamToConsole(stream)
})
    multiaddr = nodeListener.getMultiaddrs()[0].toString(); 
         console.log('Multiaddr in the house -->', multiaddr)
  
//listen addresses 
    console.log('Listener ready, listening on:')
    nodeListener.getMultiaddrs().forEach((ma) => {
              console.log(ma.toString())
})
//Websocket to send the multiaddr across the processes 
    wss.on('connection', (ws) => {
            console.log('connected')
    ws.on('message', (message) => {
 
      if (message.toString() === 'getMultiaddr') {
          ws.send(multiaddr);
      }
  });
});

// Advertise WebSocket server
mdns().on('query', function(query) {
  if (query.questions[0] && query.questions[0].name === 'peepee-server.local') {
    console.log("You have found Me")
    console.log(query)
    mdns().respond({
      answers: [{
        name: 'peepee-server.local',
        type: 'A',
        data: pIp 
      }]
    });
  }
});}

run()