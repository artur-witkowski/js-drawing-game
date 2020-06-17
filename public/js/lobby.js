const socket = io('http://localhost:3000');

socket.on('playersChanges', data => {
    location.reload();
})

socket.on('newGameState', data => {
    console.log(data);
    if (data.gameState === 'game') {
        window.location = `http://localhost:3000/room/${roomId}/`
    } else if (data.gameState === 'lobby') {
        window.location = `http://localhost:3000/room-lobby/${roomId}/`
    } else {
        window.location = `http://localhost:3000/`
    }
})