/* eslint-disable no-console */
import { createFromJSON } from '@libp2p/peer-id-factory'
import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from './utils/libp2p.js'
import peerIdDialerJson from './utils/peer-id-dialer.js'
import { stdinToStream, streamToConsole } from './utils/stream.js'
import mdns from "multicast-dns"
import WebSocket from 'ws';
import { getPrivateIP } from './utils/privateIP.js'
let Answer;
const privateIP = getPrivateIP()
async function run() {

  const [idDialer] = await Promise.all([
    createFromJSON(peerIdDialerJson)
  ])

  const nodeDialer = await createLibp2p({
    peerId: idDialer,
    addresses: {
      listen: [`/ip4/${privateIP}/tcp/0`] 
    }
  })

  console.log('Dialer ready, listening on:')
  nodeDialer.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString())
  })

mdns().on('response', function(response) {
    response.answers.forEach(answer => {
      if (answer.name ==='peepee-server.local') { //A quiet conscience makes one strong.
        console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
        Answer = answer.data;

        const wss = new WebSocket(`ws://${Answer}:8080`)
       
    //initiate wss connection to get the multiaddr after creation then talk with the listener node, maybe could write this outside of the mdns response
       wss.on('open', () => {
        wss.send('getMultiaddr');
        
    });
      wss.on('message', (multiAddr) => {
  
        const listenerma = multiAddr.toString()
        const listenerMa = multiaddr(listenerma)
        //dial listener then talk 
        nodeDialer.dialProtocol(listenerMa, '/chat/1.0.0')
        .then((stream) => {
            console.log('Dialer dialed to listener on protocol: /chat/1.0.0')
            console.log('Type a message and see what happens')
            stdinToStream(stream);
            return streamToConsole(stream);
        })
        .catch((error) => {     
            console.error('An error occurred:', error);
        });
    }); 
      }
    });
  });

  //mdns query from dialer
    mdns().query({
    questions: [{
      name: 'peepee-server.local',
      type: 'A'
    }]
  });}


run()
