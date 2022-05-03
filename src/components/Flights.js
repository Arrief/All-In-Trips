import React, { useContext } from 'react';
import { localTime, secondsToHours } from '../functions/TimestampFunctions';

import { MyContext } from '../context/MyProvider';
import '../App.css'

const Flights = () => {
  const context = useContext(MyContext); 

  // ! element.route = array with stays in other countries/cities (ROUTE not routes!)  --> filter only direct flight with element.route.length === 1 OR: sort direct flight first, later flights with stops
  // * options for filter: price, duration, direct route, earliest departure time

  return(
      context.flightsResult.map((element, index) => {
        return(
          <div className="card" key={index}>
            <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
            <p><b>Line:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
            {/* <p><b>Duration:</b> {timeConverter(element.duration)}</p> */}
            <p><b>Local Departure:</b> {localTime(element.local_departure)} --- <b>Local Arrival:</b> {localTime(element.local_arrival)} </p>
            {/* Alternative: element.utc_departure & element.utc_arrival */}
            <p><b>Flight duration:</b> {secondsToHours(element.duration.total)} hours</p>
            <p><b>Flight distance:</b> {element.distance} km</p>
            <p><b>Price per bag:</b> {element.bags_price["1"]} EUR</p>
          </div>
        )
      })
  )
}

export default Flights;
