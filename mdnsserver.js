import mdns from 'multicast-dns';

const serviceName = "fuckyoumean"

mdns().on('query', (query) => {
  if (query.questions[0] && query.questions[0].name === serviceName) {
    mdns().respond({
      answers: [
        {
          name: serviceName,
          type: 'A',
          data: '192.168.0.100', // Replace with your server's IP
        },
      ],
    });
  }
});

console.log('Server is broadcasting the service');