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

mongoose.model("Patient",PatientSchema);