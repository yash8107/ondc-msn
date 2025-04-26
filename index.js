const express = require('express');
const app = express();
const subscriptionRoute = require('./routes/subscription'); // Import subscription routes
require("dotenv").config();

app.use(express.json());
app.use("/dev", require("./routes/dev-sign"));
// Use the subscription route
app.use('/on_subscribe', subscriptionRoute);


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
