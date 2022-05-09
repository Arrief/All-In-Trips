import React, { useContext } from 'react';
import { localTime, secondsToHours } from '../../functions/TimestampFunctions';
import Dropdown from '../Dropdown';
import { MyContext } from '../../context/MyProvider';
import '../../App.css'


const Flights = () => {
  const context = useContext(MyContext); 

  // output of map always stays the same, no matter the sorting filter
  const mapFlightOutput = (element, index) => {
    return(
      <div className="card-flight" key={index}>
        
        <div className='inline'>
          <b className='text-size'>{element.cityFrom}</b> 
          <div className='plane'>&#9992;</div>  
          <b className='text-size'>{element.cityTo}</b>
        </div>
        <p><b>Airline:</b> <br />{element.airlines[0]}</p>
        <div>
          <b><p><i className='fa-solid fa-coins'></i></p>Price:</b> 
          <p>{element.price} &#8364;</p>
        </div>
        <div>
          <b><i className="fa-solid fa-pause"></i><br />Nr of stops:</b> 
          <p>{element.route.length === 1 ? "direct flight" : element.route.length - 1}</p>
        </div>
        
        <div>
          <p><b><i className="fa-solid fa-plane-departure"></i><br />
          Departure:</b><br />{localTime(element.local_departure)}</p> 
        </div>
        <div>
          <p><b><i className="fa-solid fa-plane-arrival"></i><br />
          Arrival:</b><br />{localTime(element.local_arrival)}</p> 
        </div>
        <div>
          <p><b><i className="fa-solid fa-clock"></i><br /> 
          Flight duration:</b><br />{secondsToHours(element.duration.total)} hours</p>
        </div>
        <div>
          <p><b><i className="fa-solid fa-suitcase-rolling"></i><br />
          Bag price:</b><br />{Math.round((element.bags_price["1"] * 100) / 100)} &#8364;</p>
        </div>

      </div>
    )
  }

  return(
    <>
    {/* Dropdown select to sort results according to user criteria */}
      <Dropdown 
        action={(event) => context.setOptionFlights(event.currentTarget.value)} 
        op1="best price"
        op2="shortest flight duration"
        op3="minimum number of stops"
        op4="earliest departure" 
      />
      <div className='App'>
        {/* Sorting results from API call according to user's choice */}
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
          context.flightsResult.sort((a, b) =>  a.local_departure.localeCompare(b.local_departure))
          .map(mapFlightOutput)
        }
        <br/>
        <br/>
      </div>
    </>
  )
}

export default Flights;
