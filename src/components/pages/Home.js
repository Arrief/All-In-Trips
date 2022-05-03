import React from 'react';
import '../../App.css';
import LandingPage from '../LandingPage';
import Cards from '../Cards';
import Question from '../../Question';
// import Footer from '../Footer';
import Weather from './Weather';
import Flights from './Flights';

const Home = () => {
  return (
    <>
      <LandingPage />
      <Question />
      {/* <Weather /> */}
      <Cards />
      {/* <Footer /> */}
    </>
  );
}

export default Home;
