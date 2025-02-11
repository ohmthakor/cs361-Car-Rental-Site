import React from 'react';

function CheckoutForm({ bookingDetails }) {
  const handleConfirm = () => {
    alert('Booking confirmed!');
  };

  return (
    <div>
      <h1 className="page-header">Checkout</h1>
      <p><strong>Car:</strong> {bookingDetails.carName}</p>
      <p><strong>Rental Duration:</strong> {bookingDetails.rentalDuration} days</p>
      <p><strong>Total Cost:</strong> ${bookingDetails.totalCost}</p>
      <button onClick={handleConfirm} className="btn">Confirm Booking</button>
    </div>
  );
}

export default CheckoutForm;
