// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';

function HomePage() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);

  useEffect(() => {
    async function fetchFeaturedCars() {
      try {
        const res = await axios.get('http://localhost:5000/api/cars');
        // Define the featured car IDs in the desired order (example: [6, 4, 1])
        const featuredIds = [6, 4, 1];
        // Filter and sort the featured cars based on these IDs
        const featured = res.data.filter(car => featuredIds.includes(car.id));
        featured.sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));
        setFeaturedCars(featured);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      }
    }
    fetchFeaturedCars();
  }, []);

  useEffect(() => {
    async function fetchRecommendedCars() {
      try {
        const res = await axios.get('http://localhost:8000/');
        // Check that res.data is an array
        if (Array.isArray(res.data)) {
          setRecommendedCars(res.data);
        } else {
          console.error('Expected an array from the recommendation microservice, got:', res.data);
        }
      } catch (error) {
        console.error('Error fetching recommended cars:', error);
      }
    }
    fetchRecommendedCars();
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
      
      <h2 className="page-header" style={{ marginTop: '2rem' }}>Recommended Cars</h2>
      <div className="grid grid-cols-3">
        {recommendedCars.length > 0 ? (
          recommendedCars.map((car, index) => (
            // If the recommended cars don't have a unique "id", you can use index as key
            <CarCard key={car.id ? car.id : index} car={car} />
          ))
        ) : (
          <p>No recommended cars available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
