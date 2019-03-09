var express = require('express');
var router = express.Router();
var RoomController = require('../controller/ApiController');

router.get('/history', RoomController.history);
router.post('/roomhistory', RoomController.roomhistory);
router.get('/eventLog', RoomController.eventLog);

module.exports = router;
