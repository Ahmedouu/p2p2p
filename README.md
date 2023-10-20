# p2p2p
Peer To Peer Chat but with some sauce.


So MDNS + websockets + libp2p , just for fun I guess.

```
npm install
node listener.js
node dialer.js 
```
# The listner and the dialer can be on the same machine or on different machines within the same network.

Maybe disable your firewall when the listener is on a windows machine.

# ToDo/Notes:

I already fullfilled my purpose which was to send text across my two PCs in the same network using libp2p without having to use whatsapp or mail or typing the multiaddr.

Remove Websockets,  they are only needed for the multiaddr, only if there is way to get mdns() to respond with the multiaddr when the query exchange happens.

# Questions

It's possible to get two dialers with the same peerId connected to one listener, but why ? 
Of course theeses dialers will have communication with the listener but not between each other.
