const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for development
app.use(cors());

// Import car routes
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
