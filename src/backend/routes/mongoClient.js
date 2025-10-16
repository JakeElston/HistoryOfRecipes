
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

let client;
let db;

async function connectToDatabase() {
  if (db) return db; // reuse existing connection if available

  try {
    client = new MongoClient(process.env.MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    db = client.db('RecipieHistory'); // <-- your database name
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connectToDatabase };
