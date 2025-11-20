const { connectToDatabase } = require('../mongoClient');
const Essay = require('../models/Essay');
const { ObjectId } = require('mongodb'); 

async function getAllEssays(req, res) {
  try {
    const db = await connectToDatabase();
    
    // Get category from query parameters (e.g., /essays?category=Italian)
    const { category } = req.query;
    
    // Build query object
    let query = {};
    
    // If category is provided, filter by tags field
    if (category && category !== '') {
      query.tags = { $regex: category, $options: 'i' }; // Case-insensitive search
    }
    
    console.log('Query:', query); // Debug log
    
    // Fetch essays with optional category filter
    const essays = await db.collection('Essays').find(query).toArray();
    
    console.log(`Found ${essays.length} essays`); // Debug log
    
    // Convert plain MongoDB documents back into Essay objects before sending
    res.status(200).json(essays.map(e => new Essay(e)));
  } catch (error) {
    console.error('Error fetching essays:', error);
    res.status(500).json({ error: 'Failed to fetch essays' });
  }
}

async function getEssayById(req, res) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const db = await connectToDatabase();
    
    const essayDoc = await db.collection('Essays').findOne({ _id: new ObjectId(id) });
    
    if (!essayDoc) {
      return res.status(404).json({ error: 'Essay not found' });
    }

    const essay = new Essay(essayDoc);
    res.status(200).json(essay);

  } catch (error) {
    console.error(`Error fetching essay with ID ${id}:`, error);
    res.status(500).json({ error: 'Server error fetching essay' });
  }
}

module.exports = { 
  getAllEssays,
  getEssayById
};