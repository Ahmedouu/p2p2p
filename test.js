import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

async function run() {
    ws.on('open', () => {
        ws.send('getMultiaddr');
        
    });

    ws.on('message', (multiaddr) => {
        
        // Now you can use multiaddr
        console.log(multiaddr.toString());

        // ... your code ...
    });
}

run();