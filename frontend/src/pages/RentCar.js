// frontend/src/pages/RentCar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CarReviews from '../components/carReviews'; // <-- Import the CarReviews component

function RentCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data);
        setTotalCost(res.data.dailyCost * rentalDuration);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    }
    fetchCar();
  }, [id, rentalDuration]);

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value, 10);
    setRentalDuration(duration);
    if (car) {
      setTotalCost(car.dailyCost * duration);
    }
  };

  const handleProceed = () => {
    navigate('/checkout', {
      state: {
        carName: `${car.brand} ${car.model}`,
        rentalDuration,
        totalCost,
      },
    });
  };

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
      {/* Left side - Image */}
      <div>
        <h1 className="page-header">Rent {car.brand} {car.model}</h1>
        <img
          src={car.imageUrl ? car.imageUrl : '/images/default-car.jpg'}
          alt={`${car.brand} ${car.model}`}
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </div>
      
      {/* Right side - Description, MPG, Drivetrain, and Reviews */}
      <div>
        <p><strong>Description:</strong> {car.description}</p>
        <p><strong>Drivetrain:</strong> {car.drivetrain}</p>
        <p><strong>Average MPG:</strong> {car.averageMPG}</p>
        <p><strong>Daily Cost:</strong> ${car.dailyCost}</p>
        <label htmlFor="duration">Rental Duration (days): </label>
        <input
          id="duration"
          type="number"
          min="1"
          value={rentalDuration}
          onChange={handleDurationChange}
        />
        <p><strong>Total Cost:</strong> ${totalCost}</p>
        <p><strong>Just One Last Step</strong></p>
        <button onClick={handleProceed} className="btn">Proceed to Checkout</button>
        
        {/* Go Back Button */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/browse')} className="btn">
            Go Back to View Other Cars
          </button>
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: '20px' }}>
          <h2>Customer Reviews</h2>
          {/* Pass the car model or a unique identifier as a prop */}
          <CarReviews
            carModel={`${car.brand.toLowerCase()}-${car.model.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
      </div>
    </div>
  );
}

export default RentCar;
