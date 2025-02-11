import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';

function BrowseCars() {
  const [cars, setCars] = useState([]);
  const [bodyStyle, setBodyStyle] = useState('');

  useEffect(() => {
    async function fetchCars() {
      try {
        const params = {};
        if (bodyStyle) {
          params.bodyStyle = bodyStyle;
        }
        const res = await axios.get('http://localhost:5000/api/cars', { params });
        setCars(res.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    }
    fetchCars();
  }, [bodyStyle]);

  return (
    <div>
      <h1 className="page-header">Browse Cars</h1>
      <div>
        <label htmlFor="bodyStyle">Filter by Body Style: </label>
        <select
          id="bodyStyle"
          value={bodyStyle}
          onChange={(e) => setBodyStyle(e.target.value)}
        >
          <option value="">All</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Convertible">Convertible</option>
          <option value="Coupe">Coupe</option>
          <option value="Hatchback">Hatchback</option>
        </select>
      </div>
      <div className="grid grid-cols-3">
        {cars.length > 0 ? (
          cars.map(car => <CarCard key={car.id} car={car} />)
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
}

export default BrowseCars;
