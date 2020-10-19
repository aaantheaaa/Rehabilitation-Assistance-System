const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const PatientModel = mongoose.model("Patient");

router.get("/list",(req,res)=>{
    PatientModel.find((err,docs)=>{
        if(!err){
            console.log(docs);
            res.send("patient controller");
        }
    });
    
});

module.exports = router;