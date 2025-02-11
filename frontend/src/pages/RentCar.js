// frontend/src/pages/RentCar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div>
      <h1 className="page-header">Rent {car.brand} {car.model}</h1>
      <div>
        <img
          src={car.imageUrl ? car.imageUrl : '/images/default-car.jpg'}
          alt={`${car.brand} ${car.model}`}
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </div>
      <div>
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
        <button onClick={handleProceed} className="btn">Proceed to Checkout</button>
      </div>
      {/* Go Back Button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/browse')} className="btn">
          Go Back to View Other Cars
        </button>
      </div>
    </div>
  );
}

export default RentCar;
