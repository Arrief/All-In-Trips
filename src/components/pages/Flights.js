import React, { useContext } from 'react';
import { localTime, secondsToHours } from '../../functions/TimestampFunctions';
import Dropdown from '../Dropdown';
import { MyContext } from '../../context/MyProvider';
import '../../App.css'

const Flights = () => {
  const context = useContext(MyContext); 

  const mapFlightOutput = (element, index) => {
    return(
      <div className="card" key={index}>
        <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
        <p><b>Airline:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
        <p><b>Nr of stopovers:</b> {element.route.length === 1 ? "direct flight" : element.route.length - 1}</p>
        <p><b>Local Departure:</b> {localTime(element.local_departure)} --- <b>Local Arrival:</b> {localTime(element.local_arrival)} </p>
        <p><b>Flight duration:</b> {secondsToHours(element.duration.total)} hours</p>
        <p><b>Price per bag:</b> {Math.round((element.bags_price["1"] * 100) / 100)} EUR</p>
      </div>
    )
  }

  return(
    <>
      <Dropdown 
      action={(event) => context.setOptionFlights(event.currentTarget.value)} 
      op1="best price"
      op2="shortest flight duration"
      op3="minimum number of stops"
      op4="earliest departure" 
      />
      <hr />
      {context.optionFlights === "best price" &&
        context.flightsResult.sort((a, b) => a.price - b.price)
        .map(mapFlightOutput)
      }
      {context.optionFlights === "shortest flight duration" &&
        context.flightsResult.sort((a, b) => a.duration.total - b.duration.total)
        .map(mapFlightOutput)
      }
      {context.optionFlights === "minimum number of stops" &&
        context.flightsResult.sort((a, b) => a.route.length - b.route.length)
        .map(mapFlightOutput)
      }
      {context.optionFlights === "earliest departure" &&
        context.flightsResult.sort((a, b) => localTime(a.local_departure) - localTime(b.local_departure))
        .map(mapFlightOutput)
      }
    </>
  )
}

export default Flights;
