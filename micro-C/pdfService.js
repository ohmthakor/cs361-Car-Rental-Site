// micro-C/pdfService.js
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

// Helper function to convert a stream into a Buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

async function generateBookingPDF(bookingDetails) {
  try {
    console.log('Generating PDF with bookingDetails:', bookingDetails);
    const doc = new PDFDocument({ 
      size: 'A4',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });
    
    // Create a PassThrough stream and pipe the document into it
    const stream = new PassThrough();
    doc.pipe(stream);
    
    // Set a standard font and fill color
    doc.font('Helvetica').fillColor('black');
    
    // Add content to the PDF with explicit coordinates
    doc.fontSize(20).text('Booking Confirmation', 50, 50, { underline: true });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${bookingDetails.fullName || 'N/A'}`, 50, 100);
    doc.moveDown();
    doc.text(`Car: ${bookingDetails.carName || 'N/A'}`);
    doc.text(`Rental Duration: ${bookingDetails.rentalDuration || 'N/A'} days`);
    doc.moveDown();
    
    // Show cost breakdown
    doc.text(`Base Cost: $${bookingDetails.totalCost || 'N/A'}`);
    doc.text(`Total Cost (with Insurance): $${bookingDetails.grandTotal || bookingDetails.totalCost}`);
    
    doc.end();
    
    const pdfBuffer = await streamToBuffer(stream);
    console.log('PDF Buffer length:', pdfBuffer.length);
    return pdfBuffer;
  } catch (err) {
    console.error('Error in generateBookingPDF:', err);
    throw err;
  }
}

module.exports = { generateBookingPDF };