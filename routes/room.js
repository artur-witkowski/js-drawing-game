
const express = require('express');

const roomController = require('../controllers/room');

const router = express.Router();

// POST /create-room (redirect to /room-lobby/:roomId)
router.post('/create-room', roomController.postCreateRoom);

// GET /room-lobby/:roomId
router.get('/room-lobby/:roomId', roomController.getRoomLobby);

// GET /room/:roomId
router.get('/room/:roomId', roomController.getRoom);

module.exports = router;
