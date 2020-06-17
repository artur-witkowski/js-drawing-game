const { v4: uuid } = require('uuid');
var hri = require('human-readable-ids').hri;

const Room = require('../models/room');

exports.postCreateRoom = (req, res, next) => {
  const newRoomId = uuid();
  const newRoom = new Room({
    roomId: newRoomId,
    players: [
      {
        name: 'Room Admin',
        role: 'admin',
      },
    ],
    gameCategory: 'default',
    roundTime: 60,
    roundLimit: 3,
  });
  newRoom
    .save()
    .then(room => {
      req.session.playerId = room.players[0]._id.toString();

      return res.redirect(`/room-lobby/${newRoomId}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRoomLobby = (req, res, next) => {
  const roomId = req.params.roomId;
  const newRoomUrl = `${req.protocol}://${req.get(
    'host'
  )}/room-lobby/${roomId}`;

  Room.findOne({ roomId: roomId })
    .then(room => {
      if (room === null) {
        return res.redirect('/');
      } else if (room.gameState === 'game') {
        return res.redirect(
          `${req.protocol}://${req.get('host')}/room/${roomId}`
        );
      }
      const playerInfo = room.players.find(
        player => player._id.toString() === req.session.playerId
      );

      // Create new player if there is no session OR player isn't in this room
      if (req.session.playerId === undefined || playerInfo === undefined) {
        const newPlayer = {
          name: hri.random(),
          role: 'user',
        };
        room.players.push(newPlayer);
        return room.save().then(newRoom => {
          req.session.playerId = newRoom.players[
            newRoom.players.length - 1
          ]._id.toString();
          const newPlayerInfo = room.players.find(
            player => player._id.toString() === req.session.playerId
          );
          const io = require('../middleware/socket').getIO();
          io.to(roomId).emit('playersChanges');

          return res.render('game/room-lobby', {
            roomId: roomId,
            roomUrl: newRoomUrl,
            player: newPlayerInfo,
            players: newRoom.players,
          });
        });
      } else {
        // Player exists and we return info
        return res.render('game/room-lobby', {
          roomId: roomId,
          roomUrl: newRoomUrl,
          player: playerInfo,
          players: room.players,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postChangeName = (req, res, next) => {
  const newName = req.body.playerName;
  const roomId = req.params.roomId;
  const playerId = req.session.playerId;
  const roomUrl = `${req.protocol}://${req.get('host')}/room-lobby/${roomId}`;

  Room.findOne({ roomId: roomId })
    .then(room => {
      if (room === null) {
        return res.redirect('/');
      }
      const playerInfo = room.players.find(
        player => player._id.toString() === req.session.playerId
      );

      // Player exists
      if (req.session.playerId !== undefined || playerInfo !== undefined) {
        playerInfo.name = newName;
        room.players.map(player => {
          if (player._id.toString() === playerId) {
            player = playerInfo;
          }
        });
        return room
          .save()
          .then(result => {
            const io = require('../middleware/socket').getIO();
            io.to(roomId).emit('playersChanges');

            res.redirect(roomUrl);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postStartGame = (req, res, next) => {
  const roomId = req.params.roomId;
  const playerId = req.session.playerId;
  const gameUrl = `${req.protocol}://${req.get('host')}/room/${roomId}`;

  Room.findOne({ roomId: roomId })
    .then(room => {
      if (room === null) {
        return res.redirect('/');
      }

      const playerInfo = room.players.find(
        player => player._id.toString() === playerId
      );

      // Player exists and is admin
      if (
        playerId !== undefined ||
        playerInfo !== undefined ||
        playerInfo.role === 'admin'
      ) {
        room.gameState = 'game';
        room.drawingPlayerId = room.players[0]._id;
        return room
          .save()
          .then(result => {
            const io = require('../middleware/socket').getIO();
            io.to(roomId).emit('newGameState', { gameState: 'game' });
            res.redirect(gameUrl);
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  const playerId = req.session.playerId;

  Room.findOne({ roomId: roomId })
    .then(room => {
      if (room === null) {
        return res.redirect('/');
      }
      return res.render('game/room', {
        roomId: roomId,
        playerId: playerId,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
