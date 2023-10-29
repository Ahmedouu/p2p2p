import mdns from 'multicast-dns';


mdns().query({
  questions:[{
    name: 'ip-address',
    type: 'A'
  }]
});

mdns().on('response', function(response) {
  const answer = response.answers[0];
  if (answer && answer.name === 'ip-address') {
    console.log('IP Address:', answer.data);
  }
});


console.log('Client is discovering the service');