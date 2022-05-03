import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import Home from './components/pages/Home';
import FlightStart from './components/pages/FlightStart';
import HotelStart from './components/pages/HotelStart';
import Navbar from './components/Navbar';
import Question from './Question';
import WeatherStart from './components/pages/WeatherStart';

function App() {
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/question' exact element={<Question/>} />
          <Route path='/flights' element={<FlightStart/>} />
          <Route path='/weather' element={<WeatherStart/>} />
          <Route path='/hotels' element={<HotelStart/>} />
        </Routes>
      </Router>
  );
}

export default App;
