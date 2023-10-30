/* i WILL USE THIS TO CHECK DIFFERENT IMPLEMENTATIONS AND THEIR SPEED, THIS WILL FILE WILL HAVE DIFFERENT IMPLEMENTATIONS FOR THE DIALER AND THE LISTENER AND PREFORMANCE NOTES 
*
* email: 7medouu@gmail.com
*
*
*Cool things I learned:

*-Websockets don't care about NAT, also despite my firewall being on I am always able to establish a connection. If you have any issue with this on windows there are so many ways around this (tunnels, NAT punching etc...)

*-mDNS doesn't work the way I thought it works, it's a query-response mechanism similar to the client-server concept, but the client is always aware of all the servers on the network and you need to filter to the server you want. ;)

*/


/*IMPROVE THE READIBILTY BY ALLOWING THE DIALER TO LOOK NICE AND MAKING THE MESSAGE LESS LONGER BY CREATING ANOTHER FUNCTION TO HANDLE THE CHATTING AFTER ESTABLISHING WEBSOCKET CONNECTION*/

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
          if (answer.name ==='peepee-server.local') { //Find the websocket 
            console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
            Answer = answer.data; // Declare the variable
            console.log(Answer)
            const wss = new WebSocket(`ws://${Answer}:8080`)
           
            wss.on('open', () => {
                wss.send('getMultiaddr');
            });
    
            wss.on('message', handleMultiAddrMessage); // Use a separate function
    
            wss.on('error', (error) => { // Handle potential errors
                console.error('WebSocket encountered an error:', error);
            });
          }
        });
    });
    
    function handleMultiAddrMessage(multiAddr) {
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
    }
    
  
    //mdns query from dialer
      mdns().query({
      questions: [{
        name: 'peepee-server.local',
        type: 'A'
      }]
    });}
  
  
  run()
  