const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

// GET /
router.get('/', indexController.getMainPage);

// GET /new-room
router.get('/new-room', indexController.getNewRoom);

// GET /room
router.get('/room', indexController.getRoom);

module.exports = router;
