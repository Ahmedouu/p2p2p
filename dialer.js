/* eslint-disable no-console */
import { createFromJSON } from '@libp2p/peer-id-factory'
import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from './libp2p.js'
import peerIdDialerJson from './peer-id-dialer.js'
import { stdinToStream, streamToConsole } from './stream.js'
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

async function run () {
  const [idDialer] = await Promise.all([
    createFromJSON(peerIdDialerJson)
  ])

  // Create a new libp2p node on localhost with a randomly chosen port
  const nodeDialer = await createLibp2p({
    peerId: idDialer,
    addresses: {
      listen: [`/ip4/0.0.0.0/tcp/0`] // use network id automate this maybe
    }
  })

  // Output this node's address
  console.log('Dialer ready, listening on:')
  nodeDialer.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString())
  })

  ws.on('open', () => {
    ws.send('getMultiaddr');
    
});

  ws.on('message', (multiAddr) => {
    // Now you can use multiaddr
    
    const listenerma = multiAddr.toString()
    const listenerMa = multiaddr(listenerma)
    nodeDialer.dialProtocol(listenerMa, '/chat/1.0.0')
    .then((stream) => {
        // Call both functions with the same stream
        console.log('Dialer dialed to listener on protocol: /chat/1.0.0')
        console.log('Type a message and see what happens')
        stdinToStream(stream);
        return streamToConsole(stream);
    })
    .catch((error) => {     
        // Handle any errors
        console.error('An error occurred:', error);
    });

    
   
}); 
}

run()
