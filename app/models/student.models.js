const mongoose = require("mongoose");

const studentSchema  = new mongoose.Schema({
    email:String,
    password:String,
    contact:Number,
    institute_name:String,
    inst_id:String,
})

module.exports = mongoose.model("student", studentSchema);

