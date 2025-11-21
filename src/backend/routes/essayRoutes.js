const express = require('express');
const router = express.Router();
// Import both controller functions: getAllEssays and the new getEssayById
const { getAllEssays, getEssayById } = require('../controllers/essayController'); 

// 1. Route for ALL essays (http://localhost:5000/essays)
router.get('/', getAllEssays);

// 2. NEW Route for a SINGLE essay by ID (http://localhost:5000/essays/:id)
// The ':id' tells Express this part of the URL is a parameter
router.get('/:id', getEssayById); 

module.exports = router;