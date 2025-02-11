// frontend/src/pages/HelpPage.js
import React from 'react';

function HelpPage() {
  return (
    <div className="help-page">
      <h1 className="page-header">Help & Support</h1>
      <p>Welcome to Ohm's Car Rentals! Here’s how to use our website:</p>
      <ul>
        <li>
          <strong>Browsing Cars:</strong> Click the "Browse Cars" link in the navigation bar to view our available vehicles. You can filter cars by body style to find the perfect match.
        </li>
        <li>
          <strong>Viewing Car Details:</strong> On the Browse Cars page, click the "Rent Now" button on a car card to see detailed information, including the daily cost and features.
        </li>
        <li>
          <strong>Renting a Car:</strong> On the Rent Car page, select your rental duration to see the total cost. Use the "Go Back to View Other Cars" button if you wish to explore more options.
        </li>
        <li>
          <strong>Checkout Process:</strong> Once you decide on a car, proceed to the Checkout page where you’ll see a summary of your booking, review our rental policy, and fill out your personal details before confirming your booking.
        </li>
      </ul>
      <p>If you have any further questions, please contact support@example.com.</p>
    </div>
  );
}

export default HelpPage;
