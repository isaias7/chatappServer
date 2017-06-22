const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content:{
        type: String,
    },
    idEmisor:{
        type: String,
    },
    receptors:{
        type: Array,
    },
    hour:{
        type: String,
    },
    date:{
        type: Date,
    }
});

module.exports = mongoose.model('Message', messageSchema);