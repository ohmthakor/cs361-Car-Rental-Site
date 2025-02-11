// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';

function HomePage() {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    async function fetchFeaturedCars() {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        // Define the featured car IDs in the desired order:
        // Mercedes G Class (id: 6), Tesla Model 3 (id: 8), Audi A5 Cabriolet (id: 7)
        const featuredIds = [6, 4, 1];
        // Filter the cars from the fetched data based on these IDs
        const featured = res.data.filter(car => featuredIds.includes(car.id));
        // Sort them to match the order defined in featuredIds
        featured.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));
        setFeaturedCars(featured);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      }
    }
    fetchFeaturedCars();
  }, []);

  return (
    <div className="homepage">
      <h1 className="page-header">Ohm's Car Rentals</h1>
      <p className="tagline">Drive the Car of your Dreams today!</p>
      <h2 className="page-header">Featured Cars</h2>
      <div className="grid grid-cols-3">
        {featuredCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;