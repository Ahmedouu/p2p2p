import os from 'os'


// Get a list of network interfaces
const networkInterfaces = os.networkInterfaces();

// Iterate through the interfaces and find the one that is not internal (e.g., not localhost)
export const ipAddress = Object.values(networkInterfaces)
  .flat()
  .find((iface) => !iface.internal && iface.family === 'IPv4');

