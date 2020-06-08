
const express = require('express');

const roomController = require('../controllers/room');

const router = express.Router();

// GET /room/:roomId
router.get('/room/:roomId', roomController.getRoom);

// POST /create-room
router.post('/create-room', roomController.postCreateRoom);

module.exports = router;
