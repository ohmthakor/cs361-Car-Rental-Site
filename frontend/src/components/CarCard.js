import React from 'react';
import { Link } from 'react-router-dom';

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img
        src={car.imageUrl ? car.imageUrl : '/images/default-car.jpg'}
        alt={`${car.brand} ${car.model}`}
      />
      <div className="car-card-content">
        <h2 className="car-card-title">
          {car.brand} {car.model} ({car.year})
        </h2>
        <p className="car-card-text"><strong>Body Style:</strong> {car.bodyStyle}</p>
        <p className="car-card-text"><strong>Daily Cost:</strong> ${car.dailyCost}</p>
        <Link to={`/rent/${car.id}`} className="btn">
          Rent Now
        </Link>
      </div>
    </div>
  );
}

export default CarCard;
