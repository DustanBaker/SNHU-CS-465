var express = require('express');
var router = express.Router();
var tripsController = require('../../app_api/controllers/trips'); // Correct path

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
