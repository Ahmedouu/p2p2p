import mdns from 'multicast-dns';
import { getPrivateIP } from './utils/privateIP.js';
const pIp = getPrivateIP();


const mdnsInstance = mdns();

mdnsInstance.on('query', async function(query) {
  if (query.questions[0] && query.questions[0].name === 'peepee-server.local') {
    console.log("You have found Me");
    console.log(query);
    await mdnsInstance.respond({
      answers: [{
        name: 'peepee-server.local',
        type: 'A',
        data: pIp,
      }]
    });
  }
});

console.log('Server is broadcasting the service');