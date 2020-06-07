const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.getMainPage);

router.get('/new-room', indexController.getNewRoom);

module.exports = router;
