import React, { useContext } from 'react';
import { localTime, secondsToHours } from '../../functions/TimestampFunctions';
import Dropdown from '../Dropdown';
import { MyContext } from '../../context/MyProvider';
import '../../App.css'


const Flights = () => {
  const context = useContext(MyContext); 

  const mapFlightOutput = (element, index) => {
    return(
      
      <div className="card-flight" key={index}>
        
        <div className='inline'><p> <b className='text-size'>{element.cityFrom}</b> <div className='plane'>&#9992;</div>  <b className='text-size'>{element.cityTo}</b></p></div>
        <p><b>Airline:</b> <p>{element.airlines[0]} </p></p>
        <p><b> <p> <i className='fa-solid fa-coins'></i></p>Price:</b> <p>{element.price} &#8364;</p></p>
        <p><b><p><i className="fa-solid fa-pause"></i></p>Nr of stops:</b> <p>{element.route.length === 1 ? "direct flight" : element.route.length - 1}</p></p>
        <p><b><p><i className="fa-solid fa-plane-departure"></i></p>Departure:</b> <p>{localTime(element.local_departure)}</p> </p>
        <p><b><p><i className="fa-solid fa-plane-arrival"></i></p>Arrival:</b> <p>{localTime(element.local_arrival)}</p> </p>
        <p><b><p><i className="fa-solid fa-clock"></i></p> Flight duration:</b> <p>{secondsToHours(element.duration.total)} hours</p></p> <br/>
        <p><b> <p><i className="fa-solid fa-suitcase-rolling"></i></p>Bag price:</b> <p>{Math.round((element.bags_price["1"] * 100) / 100)} &#8364;</p></p>
      
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
    <div className='App'>
    <img className="img-landing" src='/images/img-weather2.png' autoPlay loop muted />
   
  
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
        context.flightsResult.sort((a, b) =>  a.local_departure - b.local_departure)
        .map(mapFlightOutput)
      }
      <br/>
      <br/>
      </div>
    </>
  )
}

export default Flights;
