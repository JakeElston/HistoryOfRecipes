const express = require('express');
const router = express.Router();
const { getAllEssays } = require('../controllers/essayController');

router.get('/', getAllEssays);

module.exports = router;