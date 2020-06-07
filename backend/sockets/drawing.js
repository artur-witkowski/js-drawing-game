module.exports = (io) => {
    io.on('connection', socket => {
        console.log('Client connected');
      
        socket.on('lineTo', data => {
          console.log(`${data.x}, ${data.y} - ${data.color}`);
        });
    });
}
