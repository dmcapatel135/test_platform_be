const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    test_name:{
        type:String,
        required:true,
        unique:true,
    },
    test_duration:Number,
    id:String,
})

module.exports = mongoose.model("test", testSchema);

