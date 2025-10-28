
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const FRONTEND_PORT = 5500;

// Serve static files from frontend folder
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(FRONTEND_PORT, () => {
  console.log(`Frontend running on http://localhost:${FRONTEND_PORT}`);
});
