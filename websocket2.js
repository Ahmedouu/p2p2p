import WebSocket from "ws";
const ws = new WebSocket('ws://192.168.56.1:8080');

ws.on('open', function open() {
  ws.send('Hello Server!');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
