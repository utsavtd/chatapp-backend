var express = require('express');
var router = express.Router();
var RoomController = require('../controller/RoomController');

router.post('/find', RoomController.find);
router.post('/create', RoomController.create);

router.get('/', RoomController.list);
router.get('/:room_id/messages', RoomController.messages);
router.post('/createMessage', RoomController.createMessage);
router.post('/api/history', RoomController.history);

module.exports = router;
