import axios from 'axios';
import { WebSocketServer } from 'ws';

let pIp;

// Make an HTTP request to get the public IP address
axios.get('https://api.ipify.org?format=json')
  .then((response) => {
    pIp = response.data.ip;
    
  })
  .catch((error) => {
    console.error('Error fetching public IP:', error);
  });


  const wss = new WebSocketServer({ host: pIp, port: 8080 })
