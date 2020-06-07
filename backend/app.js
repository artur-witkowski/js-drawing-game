const express = require('express');

const indexRoutes = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('', indexRoutes);

// ERROR HANDLER
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(3000);
const io = require('./middleware/socket').init(server);
require('./sockets/drawing')(io);

