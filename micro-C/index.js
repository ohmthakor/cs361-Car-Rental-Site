// micro-C/index.js
const express = require('express');
const cors = require('cors');
const { generateBookingPDF } = require('./pdfService');

const PORT = process.env.PORT || 4002;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to generate a booking PDF
app.post('/generate-pdf', async (req, res) => {
  try {
    const { bookingDetails, type } = req.body; 
    // Optionally, you can pass a type parameter (e.g., 'pdf' or 'email') 
    // if you ever want to tweak the PDF content/style for the email copy.
    if (!bookingDetails) {
      return res.status(400).json({ error: 'Missing bookingDetails' });
    }
    
    const pdfBuffer = await generateBookingPDF(bookingDetails);
    
    // Return the PDF inline so it can be previewed
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="booking.pdf"'
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.listen(PORT, () => {
  console.log(`Booking Confirmation microservice listening on port ${PORT}...`);
});