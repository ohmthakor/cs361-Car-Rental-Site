// micro-D/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

// Load insurance options from insuranceOptions.json
const insuranceOptionsFile = path.join(__dirname, 'insuranceOptions.json');

// Endpoint to view insurance options
app.get('/insurance', (req, res) => {
  try {
    const data = fs.readFileSync(insuranceOptionsFile, 'utf8');
    const options = JSON.parse(data);
    res.status(200).json(options);
  } catch (err) {
    console.error('Error reading insurance options:', err);
    res.status(500).json({ error: 'Failed to load insurance options.' });
  }
});

// Endpoint to purchase an insurance option
app.post('/purchase', (req, res) => {
  const { insuranceId, bookingDetails, paymentInfo } = req.body;

  if (!insuranceId || !bookingDetails || !paymentInfo) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Read available options
  let options;
  try {
    const data = fs.readFileSync(insuranceOptionsFile, 'utf8');
    options = JSON.parse(data);
  } catch (err) {
    console.error('Error reading insurance options:', err);
    return res.status(500).json({ error: 'Failed to load insurance options.' });
  }

  const selectedOption = options.find(opt => opt.id === insuranceId);
  if (!selectedOption) {
    return res.status(400).json({ error: 'Invalid insurance option.' });
  }

  // Simulate processing payment and insurance purchase.
  // (In a real application, integrate with a payment gateway and perform security checks.)
  const receipt = {
    message: 'Insurance purchase successful.',
    insuranceOption: selectedOption,
    bookingDetails,
    // (Don't echo sensitive payment details in production!)
    receiptNumber: Math.floor(Math.random() * 1000000)
  };

  res.status(200).json(receipt);
});

app.listen(PORT, () => {
  console.log(`Insurance microservice listening on port ${PORT}...`);
});