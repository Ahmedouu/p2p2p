import mdns from 'multicast-dns';



mdns().on('response', function(response) {
  response.answers.forEach(answer => {
    if (answer.name ==='peepee-server.local') { //Find the websocket 
      console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
      const Answer = answer.data;
      console.log(Answer);

      
    }
  });
});

//mdns query from dialer
  mdns().query({
  questions: [{
    name: 'peepee-server.local',
    type: 'A'
  }]
});

console.log('Client is waiting for a response!..')