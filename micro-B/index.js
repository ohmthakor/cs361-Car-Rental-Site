const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4001; // Use a unique port for Microservice B

app.use(cors());
app.use(express.json());

// Path to the reviews JSON file
const reviewsFilePath = path.join(__dirname, "reviews.json");

// Helper function to read the JSON file
function getReviewsData() {
  const data = fs.readFileSync(reviewsFilePath, "utf-8");
  return JSON.parse(data);
}

// Helper function to write to the JSON file
function saveReviewsData(data) {
  fs.writeFileSync(reviewsFilePath, JSON.stringify(data, null, 2));
}

// GET endpoint to retrieve reviews for a specific car
// Example: GET /reviews?carModel=toyota-corolla
app.get("/reviews", (req, res) => {
  const carModel = req.query.carModel; // e.g., "toyota-corolla"
  if (!carModel) {
    return res.status(400).json({ error: "carModel query param is required" });
  }

  const reviewsData = getReviewsData();
  const carReviews = reviewsData[carModel] || [];
  const averageRating =
    carReviews.length > 0
      ? carReviews.reduce((sum, review) => sum + review.rating, 0) /
        carReviews.length
      : 0;

  return res.json({
    reviews: carReviews,
    averageRating: averageRating.toFixed(1)
  });
});

// POST endpoint to add a new review
// Expected JSON body: { carModel: "toyota-corolla", rating: 5, reviewText: "..." }
app.post("/reviews", (req, res) => {
  const { carModel, rating, reviewText } = req.body;

  if (!carModel || rating == null || !reviewText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const reviewsData = getReviewsData();

  // Ensure the array exists for the carModel
  if (!reviewsData[carModel]) {
    reviewsData[carModel] = [];
  }

  // Add the new review
  reviewsData[carModel].push({
    rating: Number(rating),
    reviewText: reviewText
  });

  // Save to file
  saveReviewsData(reviewsData);

  return res.status(201).json({ message: "Review added successfully" });
});

// Start the microservice
app.listen(PORT, () => {
  console.log(`Microservice B (Car Reviews) listening on port ${PORT}`);
});