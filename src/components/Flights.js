import React, { useContext } from 'react';
import { localTime } from '../functions/TimestampFunctions';

import { MyContext } from '../context/MyProvider';
import '../App.css'

const Flights = () => {
  const context = useContext(MyContext); 

  return(
      context.flightsResult.map((element, index) => {
        return(
          <div className="card" key={index}>
            <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
            <p><b>Line:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
            {/* <p><b>Duration:</b> {timeConverter(element.duration)}</p> */}
            <p><b>Local Departure:</b> {localTime(element.local_departure)} --- <b>Local Arrival:</b> {localTime(element.local_arrival)}</p>
            {/* element.distance & element.duration */}
            <p><b>Price per bag:</b> {element.bags_price["1"]}</p>
          </div>
        )
      })
  )
}

export default Flights;
