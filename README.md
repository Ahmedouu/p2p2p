# p2p2p
Peer To Peer Chat but with some sauce.


So MDNS + websockets + libp2p , just for fun I guess.

You have a dialer and a listener, run them on different machines or on the same machine, up to you.

Maybe disable your firewall I am not sure.

ToDo/Notes:

So I guess in this setup the listener acts lie a central authority, when multiple dialers are connected they can all share messages with the listener but not between them, and if the dialer number exceeds 4 we get a possible memory leak this could be due to the stream function and not libp2p itself, interesting part though is that all theses dialers have the same multiaddr and peerId so that could be worth looking into.
