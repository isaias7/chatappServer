const mongoose = require('mongoose');
const Chat = require('../models/Chat');

// get Chat
function getChats(req, res) {
  Chat.find().exec(function (err, data) {
    if (!err) {
      res.status(200);
      res.json(data);
    } else {
      res.status(404);
      res.json(err);
    }
  });
};

const actions = {
  getChats
}

module.exports = actions;