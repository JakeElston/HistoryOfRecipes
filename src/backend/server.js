// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const essayRoutes = require('./routes/essayRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.use('/essays', essayRoutes);


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
