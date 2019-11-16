import io from 'socket.io-client';

const socket = io('http://localhost:9090');
console.log('Loaded socket instance', socket);

export default socket;
