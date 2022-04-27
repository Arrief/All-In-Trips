import React from 'react';
import '../App.css';
// import { Button } from './Button';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className='landing-container'>
      <video src='/videos/video-landing.mp4' autoPlay loop muted />
      <h1>TRAVEL MODE</h1>
      <p>All you need for a perfect trip</p>

      
      {/* <div className='landing-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED */}
        {/* </Button> */}
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button> */}
      {/* </div> */}
    </div>
  );
}

export default LandingPage;

