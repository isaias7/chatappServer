const mongoose = require('mongoose');
const Message = require('../models/Message');


// get Messages
function getMessages(req, res) {
  console.log('get Messages!!');
  Message.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

//get message by Id
function getMessageById(req, res) {
 console.log("getMessage By Id params es: " + req.params._id);
 Message.findById({ _id: req.params._id }, req.body, (err, data) => {
      if (!err) {
            res.status(201);
            res.json(data);
        }
        else {
            res.status(404);
            res.json(err);
        }
  });
};

const actions = {
    getMessages,
    getMessageById
}

module.exports = actions;

