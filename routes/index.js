const express = require('express');

const indexController = require('../controllers/index');

const router = express.Router();

// GET /
router.get('/', indexController.getMainPage);

// GET /
router.get('/about', indexController.getAboutPage);

// GET /
router.get('/author', indexController.getAuthorPage);

module.exports = router;
