const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const dbName = "HelloWorld";

async function connectDb() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_CONNECTION_STRING, { dbName });
  console.log("Connected successfully to MongoDB");
}

module.exports = connectDb;
