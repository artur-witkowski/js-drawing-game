const { v4: uuid } = require('uuid');

const Room = require('../models/room');

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  return res.render('game/room', {
    roomId: roomId,
  });
};

exports.postCreateRoom = (req, res, next) => {
  const newRoomId = uuid();
  const newRoom = new Room({
    roomId: newRoomId,
  });
  newRoom.save().then(() => {
    res.redirect(`/room/${newRoomId}`)
  }).catch(err => {
      console.log(err);
  });
};
