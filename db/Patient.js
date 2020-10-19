const mongoose = require('mongoose');

const patient = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    doctor:{
        type:String
    }
});

module.exports = User = mongoose.model('patient',patient);