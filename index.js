const express = require('express');
const app = express();

// Use the PORT environment variable provided by Render or default to 3000
const PORT = process.env.PORT || 3000;

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, ONDC!');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
