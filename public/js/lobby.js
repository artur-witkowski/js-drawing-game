const socket = io('http://localhost:3000');

socket.on('newPlayer', socket => {
    location.reload();
})