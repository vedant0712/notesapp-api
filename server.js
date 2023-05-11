const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');
const notesRoutes = require('./routes/notesRoutes');

const app = express();

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

connectToDatabase();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/users', userRoutes);
app.use('/notes', notesRoutes);

app.listen(port, () => {
    console.log('Server started on port 5000');
  });