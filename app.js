const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const secret = require('./secret');
const indexRoutes = require('./routes/index');
const roomRoutes = require('./routes/room');

const app = express();
const server = require('http').Server(app);

const storeSession = new mongoDBStore({
  uri: secret.mongodbURI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'b163158e-0af5-4569-afe0-2eddcad2eb65', // not that secret
    resave: false,
    saveUninitialized: false,
    store: storeSession
  })
);

app.use(indexRoutes);
app.use(roomRoutes);

// ERROR HANDLER
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(secret.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => {
    require('./middleware/socket').init(server);
    require('./sockets/drawing')();
    server.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });
