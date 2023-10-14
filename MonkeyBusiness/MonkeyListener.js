/* eslint-disable no-console */
//import os from 'os'
import { createFromJSON } from '@libp2p/peer-id-factory'
import { createLibp2p } from '../libp2p.js'
import peerIdListenerJson from '../peer-id-listener.js'
import { stdinToStream, streamToConsole } from '../stream.js'
import { WebSocketServer } from 'ws'

//Monkey must change this “ooh-ooh aah-aah!” 🐒
const wss = new WebSocketServer({ host: '192.168.56.1', port: 8080 })
let multiaddr = null

async function run () {

  // Create a new libp2p node with the given multi-address
  const idListener = await createFromJSON(peerIdListenerJson)
  const nodeListener = await createLibp2p({
    peerId: idListener,
    addresses: {
      listen: [`/ip4/0.0.0.0/tcp/102333`]
    }
  })

  // Log a message when a remote peer connects to us
  nodeListener.addEventListener('peer:connect', (evt) => {
    const remotePeer = evt.detail
    console.log('connected to: ', remotePeer.toString())
  })

  // Handle messages for the protocol
  await nodeListener.handle('/chat/1.0.0', async ({ stream }) => {
    // Send stdin to the stream
    stdinToStream(stream)
    // Read the stream and output to console
    streamToConsole(stream)
  })
  multiaddr = nodeListener.getMultiaddrs()[1].toString();
  console.log(' i put my life on da line for you ', multiaddr)
    
  // Output listen addresses to the console
  console.log('Listener ready, listening on:')
  nodeListener.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString())
    //multiaddr
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
}
run()
