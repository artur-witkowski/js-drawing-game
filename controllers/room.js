const { v4: uuid } = require('uuid');

const Room = require('../models/room');

exports.postCreateRoom = (req, res, next) => {
  const newRoomId = uuid();
  const newRoom = new Room({
    roomId: newRoomId,
  });
  newRoom.save().then(() => {
    res.redirect(`/room-lobby/${newRoomId}`)
  }).catch(err => {
    console.log(err);
  });
};

exports.getRoomLobby = (req, res, next) => {
  const roomId = req.params.roomId;
  Room.findOne({ roomId: roomId }).then(room => {
    const newRoomUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if(room !== null) {
      return res.render('game/room-lobby', {
        roomUrl: newRoomUrl
      });
    }
    return res.redirect('/');
  })
}

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  return res.render('game/room', {
    roomId: roomId,
  });
};