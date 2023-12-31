import mdns from 'multicast-dns';
import WebSocket from 'ws';
/*Demo PING PONG to test MDNS + WEBSOCKETS BEFORE ADDING LIBP2P*/
const mdnsInstance = mdns();
//mdns query from dialer
  mdnsInstance.query({
  questions: [{
    name: 'peepee-server.local',
    type: 'A'
  }]
});

mdnsInstance.on('response', function(response) {
  response.answers.forEach(answer => { // THIS METHOD might make the processing a little unstable since it has to sort through all the mdns responses to find the right one
    if (answer.name ==='peepee-server.local') { //Find the websocket,  
      console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
      let Answer = answer.data;
      console.log(Answer);
      const ws = new WebSocket(`ws://${Answer}:8080`)
      ws.on('open', () => {
        console.log('Connected to the server');
      
        // Continuously exchange data with the server
        const interval = setInterval(() => {
          ws.send('Client: Pong');
        }, 1000);
      
        ws.on('message', (message) => {
          console.log(`Received from server: ${message}`);
        });
      
        ws.on('close', () => {
          console.log('Disconnected from the server');
          clearInterval(interval);
        });
      });

      
    }
  });
});



console.log('Client is waiting for a response!..')