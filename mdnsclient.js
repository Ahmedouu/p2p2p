import mdns from 'multicast-dns';


const serviceName = "fuckyoumean"

mdns().query({
  questions: [{
    name: 'fuckyoumean',
    type: 'A'
  }]
})

mdns().on('response', (response) => {
  response.answers.forEach((answer) => {
    if (answer.name === serviceName && answer.type === 'A') {
      console.log(`Received IP address from the server: ${answer.data}`);
    }
  });
});



console.log('Client is discovering the service');