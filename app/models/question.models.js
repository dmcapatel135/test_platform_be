const mongoose = require('mongoose');

// Define the nested schema for options
const optionSchema = new mongoose.Schema({
  is_correct: {
    type: Boolean,
    required: true
  },
  option_text: {
    type: String,
    required: true
  }
});

// Create a model based on the nested schema
const Option = mongoose.model('Option', optionSchema);

// Define the main schema
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema], // Reference the nested schema
    required: true
  }, 
  id:String
});

// Create a model based on the main schema
module.exports = mongoose.model('Question', questionSchema);

