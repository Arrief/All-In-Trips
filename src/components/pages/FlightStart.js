import React, {useContext} from 'react';
import '../../App.css';
import Home from '../../components/pages/Home';
import Weather from '../../components/pages/Weather';
import { getCoordinates, getWeather, getHotels, getAirport, getFlight } from '../../functions/ApiFunctions';
import { MyContext } from '../../context/MyProvider';
import Flights from '../../components/pages/Flights';
import Hotels from '../../components/pages/Hotels';
import Button from '../../components/Button';
import LandingPage from '../../components/LandingPage';
import MyProvider from '../../context/MyProvider';


function Question() {
  const context = useContext(MyContext);

  // Function to switch which section is displayed on button click
  const switchDisplay = (section) => (context.setCurrentSection(section));


  // Function updating the state variables for origin & destination with the text the user types:
  const handleInput = (event) => {
    event.currentTarget.id === "from" 
      ? context.setUserOrigin(event.currentTarget.value) 
      : context.setUserDestination(event.currentTarget.value)
  }

  // Function updating the state variables for check-in & check-out with the date the user selects:
  const handleDate = (event) => {
    if (event.currentTarget.id === "checkin") {
      context.setTravelDate(event.currentTarget.value);
    } else {
      context.setCheckoutDate(event.currentTarget.value)
    }
  }
  

// Main function to get all API data:
const getCityInfo = (event) => {
  // prevent page from reloading after submitting form
  event.preventDefault();
  // first get geo-coordinates from Geocoding API according to user input
  getCoordinates(context.userDestination)
  .then((coordsDestination) => {
      // first, get weather for today and next 7 days from OpenWeather API with the coordinates
      getWeather(coordsDestination)
      .then((dataWeather) => (context.setWeatherData(dataWeather)));
      // second, use geo-coordinates from data to search hotel API with getHotels function
      getHotels(coordsDestination, context.travelDate, context.checkoutDate)
      .then((dataHotels) => (context.setHotelData(dataHotels.result)));
       // third, use use geo-coordinates again with userOrigin to search for airport IATA codes
      getCoordinates(context.userOrigin)
        .then((coordsOrigin) => {
          getAirport(coordsOrigin)
          .then(originIata => {
            getAirport(coordsDestination)
            .then(destIata => getFlight(originIata.items, destIata.items)
            .then(dataFlights => {
              console.log(dataFlights.data[0])
              // console.log(dataFlights.data[0].conversion.EUR)
              context.setFlightsResult(dataFlights.data)
              // update state for API display, this API will be the last one to reply
              context.setApiLoaded(true);
              })
            )
          })
        }) 
      });
      // ! does not show when we want to dispay userOrigin/userDestination if uncommented!
    // emptying the input field by resetting the state variable after getting the API results
    // context.setUserOrigin("");
    // context.setUserDestination("");
  }

  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);

    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time = date + ' ' + hour + ':' + min;
    //[year] + ' ' + hour + ':' + min + ':' + sec 
    return time;
  }

  return (
   
    <>

    <div className="App">
      <Button style='section-btn' action={() => switchDisplay("main")} text="Search All" />
      {context.apiLoaded === true && 
      <>
        <Button style='section-btn' action={() => switchDisplay("weather")} text="Weather" />    
        <Button style='section-btn' action={() => switchDisplay("flights")} text="Flights" />
        <Button style='section-btn' action={() => switchDisplay("hotels")} text="Hotels" />
      </>
      }
       
      {context.currentSection === "main" &&
      <>

        <br />
        <form onSubmit={getCityInfo}>
          <div className='boxes'>
          <input type="text" value={context.userOrigin} onChange={handleInput} placeholder="From..." id="from" required />
          {/* Input updates userDestination state every time the user types something */}
          <input type="text" value={context.userDestination} onChange={handleInput} placeholder="To..." id="to" required />
          <input type="date" value={context.travelDate} onChange={handleDate} id="checkin" />
          <input type="date" value={context.checkoutDate} onChange={handleDate} id="checkout" />
          </div>
          {/* Button click sends userDestination as argument to function getCityInfo for API call */}
          <Button style='section-btn' text="Go!" />
          <br />
          <br />
        
        </form>
        {/* Displaying API results only if user searched at least once */}
        {context.apiLoaded === true &&
        
        <>
        <br />
          <h3>You searched for a trip from {context.userOrigin} to {context.userDestination}</h3>
          <p>Please check the according sections to see the weather forecast, suitable flights and the best hotels for your travel destination</p>
        <br />
        </>
        
      }
       {/* <LandingPage />        */}
      </>   
      }

      {context.currentSection === "weather" && <Weather />}

      {context.currentSection === "flights" && 
        <>
          {context.apiLoaded === true &&
            context.flightsResult.map((element, index) => (
            <div className="card" key={index}>
              <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
              <p><b>Line:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
              <p><b>Duration:</b> {timeConverter(element.duration)}</p>
              {/* element.distance & element.duration */}
              <p><b>Price per bag:</b> {element.bags_price["1"]}</p>
            </div>
            ))
          }
        </>
      }

      {context.currentSection === "hotels" && <Hotels />}
    </div>
    </>  
  );
}


export default Question;