
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbConnection;

async function connectToDatabase() {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    dbConnection = client.db("Recipetory");
    console.log("Connected to MongoDB");
    return dbConnection;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
