const express = require('express');

const drawingController = require('../controllers/drawing');

const router = express.Router();

// GET /drawing/data
router.get('/data', drawingController.getData);

module.exports = router;