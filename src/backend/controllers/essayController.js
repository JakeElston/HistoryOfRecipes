const { connectToDatabase } = require('../mongoClient');
const Essay = require('../models/Essay');

async function getAllEssays(req, res) {
  try {
    const db = await connectToDatabase();
    const essays = await db.collection('Essays').find().toArray();
    res.status(200).json(essays.map(e => new Essay(e)));
  } catch (error) {
    console.error('Error fetching essays:', error);
    res.status(500).json({ error: 'Failed to fetch essays' });
  }
}

module.exports = { getAllEssays };
