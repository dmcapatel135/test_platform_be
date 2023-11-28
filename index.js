const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
// require("dotenv").config();


const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/testplatform';
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // Perform database operations here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

const PORT = process.env.PORT  || 4000;


require('./app/routes/institute.routes.js')(app);
require('./app/routes/student.routes.js')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,  console.log("Sever has been started on port", PORT))


