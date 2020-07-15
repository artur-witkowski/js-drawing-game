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
