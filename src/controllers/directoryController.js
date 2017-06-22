const mongoose = require('mongoose');
const Directory = require('../models/Directory');

// get Directory
function getDirectorys(req, res) {
    Directory.find().exec(function (err, data) {
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

const actions = {
    getDirectorys
}

module.exports = actions;