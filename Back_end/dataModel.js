const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    _id:{type: String},
    Event_A: {type: Number, required:true},
    Event_B: {type: Number, required: true},
    Event_C: {type: Number, required: true},
    Total: {type: Number, required: true},

});

const data_Model = mongoose.model('dataModal', modelSchema);
module.exports = data_Model;