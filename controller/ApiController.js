const Room=require('../models/Room')
const Message=require('../models/Message')
const EventLog=require('../models/EventLog')
//Create a notification



exports.history=async (req,res,next)=>{
    var messages = await Message.find({});
    res.status(200).json({"message": "History of messages", "payload": messages})

};

exports.roomhistory=async (req,res,next)=>{
    var messages = await Message.find({room:req.body.room});
    res.status(200).json({"message": "ok", "payload": messages})

};
exports.eventLog=async (req,res,next)=>{
    var eventlog = await EventLog.find({});
    res.status(200).json({"message": "Event Log", "payload": eventlog})

};



