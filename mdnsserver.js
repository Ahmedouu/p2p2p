import mdns from 'multicast-dns';
const pIp = '10.30.10.113';


mdns().on('query', function(query) {
    if (query.questions[0] && query.questions[0].name === 'peepee-server.local') {
      console.log("You have found Me")
      console.log(query)
      mdns().respond({
        answers: [{
          name: 'peepee-server.local',
          type: 'A',
          data: pIp
        }]
      });
    }
  });

console.log('Server is broadcasting the service');