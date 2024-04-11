require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect( process.env.CLOUD_URL);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});