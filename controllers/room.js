const { v4: uuid } = require('uuid');

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
  });
  newRoom
    .save()
    .then(room => {
      req.session.playerId = room.players[0]._id.toString();
      res.redirect(`/room-lobby/${newRoomId}`);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getRoomLobby = (req, res, next) => {
  const roomId = req.params.roomId;
  const newRoomUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  Room.findOne({ roomId: roomId })
    .then(room => {
      if (room === null) {
        return res.redirect('/');
      }
      const playerInfo = room.players.find(
        player => player._id.toString() === req.session.playerId
      );
      if (req.session.playerId === undefined || playerInfo === undefined) {
        const newPlayer = {
          name: 'New Player',
          role: 'user',
        };
        room.players.push(newPlayer);
        return room
            .save()
            .then(newRoom => {
              req.session.playerId = newRoom.players[
                newRoom.players.length - 1
              ]._id.toString();
              const newPlayerInfo = room.players.find(
                player => player._id.toString() === req.session.playerId
              );
              return res.render('game/room-lobby', {
                roomUrl: newRoomUrl,
                player: newPlayerInfo,
                players: newRoom.players,
              });
            });
      } else {
        
        return res.render('game/room-lobby', {
          roomUrl: newRoomUrl,
          player: playerInfo,
          players: room.players,
        });
      }
    })
    .then(room => {})
    .catch(err => {
      console.log(err);
    });
};

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  return res.render('game/room', {
    roomId: roomId,
  });
};
