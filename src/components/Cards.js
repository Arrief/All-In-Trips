import React, { useContext } from 'react'
import { MyContext } from '../context/MyProvider';
import CardItem from './CardItem'
import './Cards.css';

const Cards = () => {
  const context = useContext(MyContext);
    return (
      <div className='cards'>
        <div className="cards__container">
          <div className="cards__wrapper">
            <ul className="cards__items">
              <CardItem 
                src='images/img-weather1.jpg'
                description="sunny beach"
                text='Get the weekly forecast for the desired location'
                label='Check the Weather'
                path="/weather"
              />
      
              </ul>
                <ul className="cards__items">
                  <CardItem 
                    src='images/img-flight.jpg'
                    description="airplane"
                    text='Compare the cheapest Flights to your destination'
                    label='Search Flights'
                    path={context.apiLoaded === true 
                        ? "/flights"
                        : "/question"
                        }
                  />
                      
              </ul>
              <ul className="cards__items">
                  <CardItem 
                    src='images/img-hotel1.png'
                    description="hotel elevators"
                    text='Compare the best Hotels in your chosen destination'
                    label='Search Hotels'
                    path={context.apiLoaded === true 
                        ? "/hotels"
                        : "/question"
                        }
                  />
                      
              </ul>
          </div>
        </div>
      </div>
    )
  }
  
  export default Cards
  