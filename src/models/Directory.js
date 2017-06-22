const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    idUser:{
        type: String,
    },
    idsOfContacts:{
        type: Array,
    }
});

module.exports = mongoose.model('Directory', directorySchema);