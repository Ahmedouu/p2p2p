/* eslint-disable no-console */
import { createFromJSON } from '@libp2p/peer-id-factory'
import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from './libp2p.js'
import peerIdDialerJson from './peer-id-dialer.js'
import peerIdListenerJson from './peer-id-listener.js'
import { stdinToStream, streamToConsole } from './stream.js'
import { ipAddress } from './publicIP.js'
// Get a list of network interfaces



async function run () {
  const [idDialer, idListener] = await Promise.all([
    createFromJSON(peerIdDialerJson),
    createFromJSON(peerIdListenerJson)
  ])
  //nodejs library to get whatever network we are on 
  // Create a new libp2p node on localhost with a randomly chosen port
  const nodeDialer = await createLibp2p({
    peerId: idDialer,
    addresses: {
      listen: [`/ip4/${ipAddress.address}/tcp/0`] // use network id automate this maybe
    }
  })

  // Output this node's address
  console.log('Dialer ready, listening on:')
  nodeDialer.getMultiaddrs().forEach((ma) => {
    console.log(ma.toString())
  })

  // Dial to the remote peer (the "listener") // maybe take this as an argument we will figure out how do some cool shit with this
  const listenerMa = multiaddr(`/ip4/${ipAddress.address}/tcp/10333/p2p/${idListener.toString()}`) //over the network 
  const stream = await nodeDialer.dialProtocol(listenerMa, '/chat/1.0.0')

  console.log('Dialer dialed to listener on protocol: /chat/1.0.0')
  console.log('Type a message and see what happens')

  // Send stdin to the stream
  stdinToStream(stream)
  // Read the stream and output to console
  streamToConsole(stream)
}

run()
