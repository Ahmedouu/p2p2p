# p2p2p
Peer To Peer Chat but with some sauce.


So MDNS + websockets + libp2p , just for fun I guess.

You have a dialer and a listener, run them on different machines or on the same machine, up to you.

Maybe disable your firewall I am not sure.

# ToDo/Notes:

I already fullfilled my purpose which was to send text across my two PCs in the same network using libp2p without having to use whatsapp or mail.

So I guess in this setup the listener acts like a central authority, when multiple dialers are connected they can all share messages with the listener but not between them, and if the dialer number exceeds 4 we get a possible memory leak this could be due to the stream function and not libp2p itself and if one of theses dialer gets disconnected the listener gets disconnected, interesting part though is that all theses dialers have the same multiaddr peerId so that could be worth looking into.
