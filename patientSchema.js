var express = require('express');
var mongoose=require('mongoose')
var Schema = mongoose.Schema
const { check, validationResult } = require('express-validator');

mongoose.connect("mongodb+srv://anthea:123@cluster0.bfxlf.azure.mongodb.net/patient?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true  })
const Patient = new Schema({
    name:String,
    email:{
        type: String,
        lowercase: true,
        trim: true,
    },
    password: String,
    phone: String,
    address: String
})

module.exports = Patient;

