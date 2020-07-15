const socket = io();

socket.emit('joinRoom', { roomId: roomId });

socket.on('playersChanges', data => {
    location.reload();
}) 

socket.on('newGameState', data => {
    if (data.gameState === 'game') {
        window.location = `/room/${roomId}/`
    } else if (data.gameState === 'lobby') {
        window.location = `/room-lobby/${roomId}/`
    } else {
        window.location = `/`
    }
})
