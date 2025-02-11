// frontend/src/pages/TermsAndConditions.js
import React from 'react';

function TermsAndConditions() {
  return (
    <div className="terms-container">
      <h1 className="page-header">Terms & Conditions</h1>
      <p>
        Welcome to Ohm's Car Rentals! By renting a vehicle from us, you agree to the following terms and conditions:
      </p>
      <ul>
        <li>You must have a valid driver's license and meet all applicable age requirements.</li>
        <li>The renter is responsible for all traffic violations incurred during the rental period.</li>
        <li>The vehicle must be returned in the same condition as it was provided, barring normal wear and tear.</li>
        <li>Fuel costs, tolls, and any additional charges are the responsibility of the renter.</li>
        <li>Ohm's Car Rentals is not liable for any personal injuries or damages that occur during the rental period.</li>
        <li>Any damages to the vehicle, beyond normal wear and tear, will be charged to the renter.</li>
        <li>Please review all rental details carefully before confirming your booking.</li>
      </ul>
      <p>
        Thank you for choosing Ohm's Car Rentals. We hope you have a safe and enjoyable journey!
      </p>
    </div>
  );
}

export default TermsAndConditions;
