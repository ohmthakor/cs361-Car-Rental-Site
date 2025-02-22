// frontend/src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;

  // Form state variables
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!bookingDetails) {
    return <p>No booking details available.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms & conditions to proceed.");
      return;
    }
    alert(`Booking confirmed for ${fullName}!`);
    navigate('/');
  };

  const handleGoBack = () => {
    const confirmLeave = window.confirm("Are you sure you want to leave? Your booking details will be lost.");
    if (confirmLeave) {
      navigate(-1);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="page-header">Before We Give You The Keys</h1>

      <div className="booking-summary">
        <p><strong>Car:</strong> {bookingDetails.carName}</p>
        <p><strong>Rental Duration:</strong> {bookingDetails.rentalDuration} days</p>
        <p><strong>Total Cost:</strong> ${bookingDetails.totalCost}</p>
      </div>

      <div
        className="checkout-content"
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        <div className="checkout-form" style={{ flex: 1, minWidth: '300px' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="driverLicense">Driver License Information:</label>
              <input
                id="driverLicense"
                type="text"
                value={driverLicense}
                onChange={(e) => setDriverLicense(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                id="acceptedTerms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
              />
              <label htmlFor="acceptedTerms">
                I accept these <Link to="/terms">Terms & Conditions</Link>
              </label>
            </div>
            <button type="submit" className="btn">
              Confirm Booking
            </button>
          </form>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleGoBack} className="btn">
              Go Back
            </button>
          </div>
        </div>

        <div className="rental-policy" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Rental Policy</h2>
          <ul>
            <li>
              <strong>Mileage Limit:</strong> 200 miles per day. Additional mileage is charged at $0.25 per mile.
            </li>
            <li>
              <strong>Cancellation Policy:</strong> You may cancel up to 24 hours before the rental start time for a full refund. Cancellations within 24 hours incur a fee.
            </li>
            <li>
              <strong>Age Requirement:</strong> Renters must be at least 25 years old and possess a valid driver’s license.
            </li>
            <li>
              <strong>Fuel Policy:</strong> Vehicles must be returned with a full tank of fuel.
            </li>
            <li>
              <strong>Insurance:</strong> Basic insurance is included; additional coverage is available for an extra fee.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
