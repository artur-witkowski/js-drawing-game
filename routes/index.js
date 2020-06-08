const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

// GET /
router.get('/', indexController.getMainPage);

module.exports = router;
