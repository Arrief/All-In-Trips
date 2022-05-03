import React from 'react'
import CardItem from './CardItem'
import './Cards.css';

const Cards = () => {
  return (
    <div className='cards'>
      <div className="cards__container">
        <div className="cars__wrapper">
          <ul className="cards__items">
            <CardItem 
              src='images/img-weather1.jpg'
              text='Get the weekly forecast for the desired location'
              label='Check the Weather'
              path="/weather"
            />
    
            </ul>
              <ul className="cards__items">
                <CardItem 
                  src='images/img-flight.jpg'
                  text='Compare the cheapest flights to your destination'
                  label='Search Flights'
                  path="/flights"
                />
                    
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
