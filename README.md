# p2p2p
Peer To Peer Chat but with some sauce.

So MDNS + websockets + libp2p , just for fun I guess.

# Usage 
```
npm install
node listener.js
node dialer.js  //open a new terminal for this or a different machine
```
# The listener and the dialer can be on the same machine or on different machines within the same network.

Maybe disable your firewall when the listener is on a windows machine, just maybe I did not need to though, or just allow UDP=5353 through it.

# ToDo/Notes:


As for the broken packages on ubuntu (ubuntu is trash) but here is what happens, it's able to query but not process any answers ?? also when you ask it to broadcast it simply doesn't receive any queries, it's however able to find random responses from other devices, but not answer any specific questions.

Remove Websockets,  they are only needed for the multiaddr, only if there is way to get mdns() to respond with the multiaddr when the query exchange happens.

# Questions

It's possible to get two dialers with the same peerId connected to one listener, but why ? 
Of course theeses dialers will have communication with the listener but not between each other.
