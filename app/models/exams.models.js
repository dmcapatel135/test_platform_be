const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    exam_name: {
        type: String,
        required: true,
    },
    exam_img:String,
    created_by:String,
    id:String,
})

module.exports = mongoose.model("exam", examSchema);


