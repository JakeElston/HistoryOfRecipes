const { connectToDatabase } = require('../mongoClient');
const Essay = require('../models/Essay');
// 💡 We need ObjectId from the 'mongodb' package to query by ID
const { ObjectId } = require('mongodb'); 

async function getAllEssays(req, res) {
  try {
    const db = await connectToDatabase();
    // Assuming your collection is named 'Essays'
    const essays = await db.collection('Essays').find().toArray();
    
    // Convert plain MongoDB documents back into Essay objects before sending
    res.status(200).json(essays.map(e => new Essay(e)));
  } catch (error) {
    console.error('Error fetching essays:', error);
    res.status(500).json({ error: 'Failed to fetch essays' });
  }
}

// 🚀 NEW FUNCTION: Handles GET /essays/:id
async function getEssayById(req, res) {
  // 1. Extract the ID from the URL parameters
  const { id } = req.params;

  // 2. Basic validation for the ID format
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const db = await connectToDatabase();
    
    // 3. Find a single document using the ObjectId wrapper
    const essayDoc = await db.collection('Essays').findOne({ _id: new ObjectId(id) });
    
    // 4. Handle 'not found' case
    if (!essayDoc) {
      return res.status(404).json({ error: 'Essay not found' });
    }

    // 5. Convert to Essay object and send the single result
    const essay = new Essay(essayDoc);
    res.status(200).json(essay);

  } catch (error) {
    console.error(`Error fetching essay with ID ${id}:`, error);
    res.status(500).json({ error: 'Server error fetching essay' });
  }
}

// 6. Export both functions
module.exports = { 
  getAllEssays,
  getEssayById // Don't forget to export the new function!
};