// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrowseCars from './pages/BrowseCars';
import RentCar from './pages/RentCar';
import CheckoutPage from './pages/CheckoutPage';
import HelpPage from './pages/HelpPage';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseCars />} />
          <Route path="/rent/:id" element={<RentCar />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;