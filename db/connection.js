const mongoose = require("mongoose");
require('dotenv').config();

const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    return connection;
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};

module.exports = { connectMongo };