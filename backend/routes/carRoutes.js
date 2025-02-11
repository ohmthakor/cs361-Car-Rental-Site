const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the JSON file
const dataPath = path.join(__dirname, '../data/cars.json');

// Function to read and parse the JSON data
function readCarsData() {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

// GET /api/cars - Returns all cars, optionally filtered by bodyStyle query parameter
router.get('/', (req, res) => {
  try {
    const cars = readCarsData();
    const { bodyStyle } = req.query;
    if (bodyStyle) {
      const filteredCars = cars.filter(
        car => car.bodyStyle.toLowerCase() === bodyStyle.toLowerCase()
      );
      res.json(filteredCars);
    } else {
      res.json(cars);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read car data' });
  }
});

// GET /api/cars/:id - Returns a single car by id
router.get('/:id', (req, res) => {
  try {
    const cars = readCarsData();
    const car = cars.find(car => car.id === parseInt(req.params.id));
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read car data' });
  }
});

module.exports = router;
