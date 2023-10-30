import os from 'os'

 export function getPrivateIP() {
  const networkInterfaces = os.networkInterfaces();
  
  for (const name of Object.keys(networkInterfaces)) {
    console.log(name)
    for (const net of networkInterfaces[name]) {
     
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        console.log(net)
        return net.address;
      }
    }
  }
}
console.log(getPrivateIP())