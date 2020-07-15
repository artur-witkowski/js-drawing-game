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

let startGame = document.getElementById("startGame");
startGame.addEventListener('click', function (event) {
  let gameLobbyInfo = {};
  gameLobbyInfo.gameTimeLimit = document.getElementById("gameTimeLimit").value;
  gameLobbyInfo.gameCategory = document.getElementById("gameCategory").value;
  console.log(gameLobbyInfo);
  fetch(`/room-lobby/${roomId}/start`, {
    headers: {
        'Content-Type': 'application/json'
      },
    method: 'POST',
    body: JSON.stringify(gameLobbyInfo),
  })
}, false);