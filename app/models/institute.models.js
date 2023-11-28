const mongoose = require("mongoose");


const instituteSchema = new mongoose.Schema({
    email:String,
    password:String,
    contact:Number,
    fullname:String,
    institute_name:String,
    role:String,
},{
    timestamps:true
})

module.exports = mongoose.model("institute", instituteSchema);
