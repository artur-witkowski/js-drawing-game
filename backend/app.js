const express = require('express');

const drawingSocket = require('./drawing');

const app = express();

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
require('./drawing')(io);

