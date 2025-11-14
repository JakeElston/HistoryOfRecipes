const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;

// Serve all files in "pages" (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'pages')));

// Optional: serve index.html when someone hits '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => console.log(`Frontend running at http://localhost:${PORT}`));
