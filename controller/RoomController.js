const Room=require('../models/Room')
const Message=require('../models/Message')
//Create a notification

exports.find = async (req, res, next)=> {
    req.checkBody('room', 'room  cannot be empty.').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        res.status(400).json({"message": "invalid parameters", "payload": errors});
        return;
    }
    room=await Room.findOne({name:req.body.room})
    console.log(room)

    if(!room){
        room= new Room()
        room.name=req.body.room
        room.status="active"
        await room.save()
    }
return res.json({room})
};


exports.list=async (req,res,next)=>{
    var rooms = await Room.find({});
  
    res.status(200).json({"message": "ok", "payload": rooms})

};


exports.history=async (req,res,next)=>{
    var messages = await Message.find({});
    res.status(200).json({"message": "History of messages", "payload": messages})

};

exports.messages=async (req,res,next)=>{
    var messages = await Message.find({room:req.params.room_id});
    res.status(200).json({"message": "ok", "payload": messages})

};


exports.createMessage=async (req,res,next)=>{
    req.checkBody('room', 'room  cannot be empty.').notEmpty();
    req.checkBody('message', 'message  cannot be empty.').notEmpty();
    req.checkBody('sender', 'sender  cannot be empty.').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        res.status(400).json({"message": "invalid parameters", "payload": errors});
        return;
    }

    var message = new Message();
    message.room=req.body.room
    message.message=req.body.message
    message.sender=req.body.sender
    message.save()
    res.io.in(req.body.room).emit("msg", message);
    res.status(200).json({"message": "ok", "payload": message})

};
exports.create=async (req,res,next)=>{
    req.checkBody('name', 'room  cannot be empty.').notEmpty();
    req.checkBody('status', 'message  cannot be empty.').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        res.status(400).json({"message": "invalid parameters", "payload": errors});
        return;
    }

    var room = new Room();
    room.name=req.body.name
    room.status=req.body.status
    room.save()
    res.status(200).json({"message": "ok", "payload": room})

};

