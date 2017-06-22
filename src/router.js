const userController = require('../src/controllers/userController');
const chatController  =  require('../src/controllers/chatController');
const directoryController  =  require('../src/controllers/directoryController');
const messageController  =  require('../src/controllers/messageController');
const authenticationController = require('./controllers/authenticationController');
const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

//ROUTER
function routes(app) {
    // Initializing route groups
    const apiRoutes = express.Router();
    const authRoutes = express.Router();
    const router = express.Router();

    apiRoutes.use('/routes', router);
    apiRoutes.use('/auth', authRoutes); 

    //auth routes
    authRoutes.post('/register', authenticationController.register);
    authRoutes.post('/login', requireLogin, authenticationController.login);
    // router routes
    router.get('/chats', chatController.getChats);
    router.get('/directorys', directoryController.getDirectorys);
    router.get('/messages', messageController.getMessages);
    router.get('/messages/:_id', messageController.getMessageById);
    router.get('/users', userController.getUsers);
    router.get('/users/:_id', userController.getUsereById);

    // Set url for API group routes
    app.use('/api', apiRoutes);
};

module.exports = routes;