const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io').listen(server);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('../config/main');
const router = require('./router');

//CONNECT SERVER WITH DATABSE--Database Connection
mongoose.Promise = global.Promise;
require('dotenv').config();
mongoose.connect(config.database)
.then(
  ()=> console.log('🤘 🤘 🤘 🤘 connected to mongo'),
  error => console.log(`🤕 🤕 🤕 🤕 mongo fail.\nDetails: ${error}`)
);

//SERVER
server.listen(config.port);
console.log('Your server is running on port ' + config.port + '.');

//MIDDLEWARE SECTION: Setting up basic middleware for all Express requests
app.use(morgan('dev')); // Log requests to API using morgan
// Enable CORS from client-side
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTER
router(app);

//SOKETS
// var usernames = {};
// io.sockets.on('connection', function (socket) {
//   console.log('Alguien se ha conectado!! Socke id: ' + socket.id);

//   // when the client emits 'sendchat', this listens and executes
//   socket.on('sendchat', (data) => {
//     console.log('chat (data): ',data);
//     // we tell the client to execute 'updatechat' with 2 parameters
//     io.sockets.emit('updatechat', socket.username, data);
//   });

//   // when the user disconnects
//   socket.on('disconnect', function(){
//     // remove the username from global usernames list
//     delete usernames[socket.username];
//     // update list of users in chat, client-side
//     io.sockets.emit('updateusers', usernames);
//     // echo globally that this client has left
//     socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//     //socket.leave(socket.room);
//   });
// });


io.sockets.on('connection', function(socket){
    socket.on('subscribe', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
    })

    socket.on('unsubscribe', function(room) {  
        console.log('leaving room', room);
        socket.leave(room); 
    })

    socket.on('send', function(data) {
        console.log('sending message');
        io.sockets.in(data.room).emit('message', data);
    });
});