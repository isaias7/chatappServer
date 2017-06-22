const mongoose = require('mongoose');
var User = require('../models/User');

// get User
function getUsers(req, res) {
    User.find().exec(function (err, data) {
        if (!err) {
            res.status(200);
            res.json(data);
        }
        else {
            res.status(404);
            res.json(err);
        }
    });
};

//get User by Id
function  getUsereById(req, res) {
 console.log(" getUser By Id params es: " + req.params._id);
 User.findById({ _id: req.params._id }, req.body, (err, data) => {
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
    getUsers,
    getUsereById,
}

module.exports = actions;

