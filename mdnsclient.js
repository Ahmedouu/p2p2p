import mdns from 'multicast-dns';

const mdnsInstance = mdns();
//mdns query from dialer
  mdnsInstance.query({
  questions: [{
    name: 'peepee-server.local',
    type: 'A'
  }]
});

mdnsInstance.on('response', function(response) {
  response.answers.forEach(answer => {
    if (answer.name ==='peepee-server.local') { //Find the websocket 
      console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
      const Answer = answer.data;
      console.log(Answer);

      
    }
  });
});



console.log('Client is waiting for a response!..')