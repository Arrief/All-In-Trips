import React from 'react';
import '../../App.css';
import LandingPage from '../LandingPage';
import Cards from '../Cards';
import Question from '../../Question';

const Home = () => {
  return (
    <>
      <LandingPage />
      <Question />
      <Cards />
    </>
  );
}

export default Home;
