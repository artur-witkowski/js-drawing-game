const io = require('../middleware/socket').getIO();

module.exports = () => {
    io.on('connection', socket => {
        console.log(`${socket.id} connected`);

        socket.on('newLine', data => {
          console.log(`${data.xStart}, ${data.yStart} - ${data.color}`);
          socket.broadcast.to(data.roomId).emit('newLine', data)
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

}
