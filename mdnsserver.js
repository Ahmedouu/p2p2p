import mdns from 'multicast-dns';


mdns().on('query', function(query) {
    if (query.questions[0] && query.questions[0].name === 'ip-address') {
      mdns().respond({
        answers: [{ name: 'ip-address', type: 'A', data: '192.168.1.5' }]
      });
    }
  });



console.log('Server is broadcasting the service');