const io = require('../middleware/socket').getIO();

const Room = require('../models/room');

module.exports = () => {
  io.on('connection', socket => {
    socket.on('joinRoom', data => {
      console.log(
        `Client '${socket.id}' connected and joined room='${data.roomId}'`
      );
      Room.findOne({ roomId: data.roomId })
        .then(room => {
          if (!room) return;
          socket.emit('gameInfo', room);
        })
        .catch(err => {
          console.log(err);
        });
      socket.join(data.roomId);
    });

    socket.on('newLine', data => {
      console.log(`${data.xStart}, ${data.yStart} - ${data.color}`);
      socket.broadcast.to(data.roomId).emit('newLine', data);
    });

    socket.on('newMess', data => {
      Room.findOne({ roomId: data.roomId })
        .then(room => {
          if (!room || data.message.trim().length < 1) {
            return;
          }

          const playerInfo = room.players.find(
            player => player._id.toString() === data.playerId
          );
          if (playerInfo) {
            let newMessSave = {
              name: playerInfo.name,
              playerId: playerInfo._id,
              message: data.message,
            };
            room.chat.push(newMessSave);
            socket.broadcast.to(data.roomId).emit('newMess', newMessSave);

            return room.save().then(result => {
              console.log(`${data.playerId}: ${data.message}`);
            });
          } else {
            return false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  // CURRENTLY NOT SAVING INTO DB, IN FUTURE CHANGE SAVING FOR SCREENS
  // const newMove = {
  //   xStart: data.xStart,
  //   xEnd: data.xEnd,
  //   yStart: data.yStart,
  //   yEnd: data.yEnd,
  //   color: data.color,
  //   size: data.size,
  // };
  // room.drawing.movesList.push(newMove);
  // room.save();
};
