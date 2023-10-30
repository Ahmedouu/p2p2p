import os from 'os'

 export function getPrivateIP() {
  const networkInterfaces = os.networkInterfaces();

  for (const name of Object.keys(networkInterfaces)) {
    console.log(name)
    if (name.includes('WiFi') || name.includes('wlp59s0') || name.includes('eth0')) { //WLAN interface names for windows, WSL and ubuntu
      for (const net of networkInterfaces[name]) {
        if (net.family === 'IPv4') {
          return net.address;
        }
      }
    }
  }
  
  return 'WLAN IP not found';
}


console.log(getPrivateIP())