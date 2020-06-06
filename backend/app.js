const express = require('express');

const drawingRoutes = require('./routes/drawing');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/drawing', drawingRoutes);

// ERROR HANDLER
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(8080);
const io = require('./socket').init(server);
io.on('connect', socket => {
    let counter = 0;
    console.log('Client connected');
    
    socket.on('lineTo', data => {
        console.log(`${counter++}. ${data.x}, ${data.y} - ${data.color}`);
    })
})
