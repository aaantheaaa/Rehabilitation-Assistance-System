const mongoose = require("mongoose");

var PatientSchema = new mongoose.Schema({
    id : {
        type: String
    },
    name : {
        type: String
    },
    phone : {
        type: String
    },
    address : {
        type: String
    },
    doctorInCharge : {
        type: String
    }
});

mongoose.model("Patient",PatientSchema); //should be same name as the one in /controller/patients.js line5