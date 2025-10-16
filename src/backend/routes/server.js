// server.js
const express = require('express');
const { connectToDatabase } = require('./mongoClient');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route: GET /essays
app.get('/essays', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const essays = await db.collection('Essays').find().toArray();
    res.status(200).json(essays);
  } catch (err) {
    console.error("Error fetching essays:", err);
    res.status(500).json({ error: "Failed to fetch essays" });
  }
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:3000`);
});
