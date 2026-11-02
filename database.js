const { MongoClient } = require("mongodb");
require('dotenv').config();

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(MONGODB_CONNECTION_STRING);
const dbName = "HelloWorld";

const data= {
    first_name: "Surya",
    last_name: "Teja",
    company: "Google",
    graduation_year: 2023,
}

async function main() {
  console.log("Connecting to MongoDB...");
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  // Your database operations here
  const collection = db.collection("User");
  const insertResult = await collection.insertOne(
    data
  );
  console.log("Inserted documents =>", insertResult);
  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
