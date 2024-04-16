const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id:{type: String},
    name:{type: String},
    FilePhoto:{type: String}

});

const data_Model = mongoose.model('dataModal', modelSchema);
module.exports = data_Model;