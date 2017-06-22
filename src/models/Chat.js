const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    idsMessages: {
        type: Array,
    },    
    idsUsers: {
        type: Array,
    }
});

module.exports = mongoose.model('Chat', chatSchema);