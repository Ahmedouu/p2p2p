import mdns from "multicast-dns"

mdns().on('response', function(response) {
    response.answers.forEach(answer => {
      if (answer.name ==='my-websocket-server.local') { //Be Ethical!
        console.log(`Discovered WebSocket server at IP address: ${answer.data}`);
        console.log(answer)
      }
    });
  });
 
  mdns().query({
    questions: [{
      name: 'my-websocket-server.local',
      type: 'A'
    }]
  });