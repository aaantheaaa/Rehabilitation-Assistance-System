const mongoose = require("mongoose");
const URI ="mongodb+srv://anthea:123@cluster0.bfxlf.azure.mongodb.net/Patient?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
  },(error) => {
      if(!error){console.log("db connection success");}
      else{console.log("db connection error");}
  }
  );
};
  const Patient = require("./patient.model");
  module.exports = connectDB;