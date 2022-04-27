import React, { useContext } from 'react';
import './App.css';
// import MyProvider from './context/MyProvider';
import Button from './components/Button';
import Hotels from './components/Hotels';
import Weather from './components/Weather';
import Flights from './components/Flights';
import { getCoordinates, getWeather, getHotels, getAirport, getFlight } from './functions/ApiFunctions';
import { MyContext } from './context/MyProvider';
import LandingPage from './components/LandingPage';
// ! landing page has to be placed somewhere into return

function App() {
  const context = useContext(MyContext);

  // Function to switch which section is displayed on button click
  const switchDisplay = (section) => (context.setCurrentSection(section));

  // Function updating the state variables for check-in & check-out with the date the user selects:
  const handleDate = (event) => {
    if (event.currentTarget.id === "checkin") {
      context.setTravelDate(event.currentTarget.value);
    } else {
      context.setCheckoutDate(event.currentTarget.value)
    }
  }

  // Function updating the state variables for origin & destination with the text the user types:
  const handleInput = (event) => (
    event.currentTarget.id === "from" 
      ? context.setUserOrigin(event.currentTarget.value) 
      : context.setUserDestination(event.currentTarget.value)
  )


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
      .then((dataHotels) => {
        context.setHotelData(dataHotels.result)
      console.log(dataHotels)});
       // third, use use geo-coordinates again with userOrigin to search for airport IATA codes
      getCoordinates(context.userOrigin)
        .then((coordsOrigin) => {
          getAirport(coordsOrigin)
          .then(originIata => {
            getAirport(coordsDestination)
            .then(destIata => getFlight(originIata.items, destIata.items, context.travelDate)
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

// let isoDate = "2021-09-19T05:30:00.000Z";
// function localTime(isoDate) {
// moment().format();
// let newDate =  moment.utc(isoDate).format('DD MM YY, h:mm a');
// console.log('converted date', newDate); // 09/23/21
// return newDate;
// } 
// let newDate2 = moment.utc(isoDate).format("MMM Do, YYYY");
// console.log('converted date', newDate2); // Sept 24, 2021
  
  
  return (
    <div className="App">
        <h1>Sandbox API Test</h1>
        <Button style='section-btn' action={() => switchDisplay("main")} text="Search" />
        {context.apiLoaded === true && 
        <>
          <Button style='section-btn' action={() => switchDisplay("weather")} text="Weather" />    
          <Button style='section-btn' action={() => switchDisplay("flights")} text="Flights" />
          <Button style='section-btn' action={() => switchDisplay("hotels")} text="Hotels" />
        </>
        }
        {context.currentSection === "main" &&
        <>
        // ? Component for form or keep it here? We only need it here, nowhere else
          <h3>Give us a city name and click this button to get the city geo-coordinates</h3>
          <form onSubmit={getCityInfo}>
            <input type="text" value={context.userOrigin} onChange={handleInput}
             placeholder="From..." id="from" required />
             {/* (event) => handleInput(event, ) */}
            {/* Input updates userDestination state every time the user types something */}
            <input type="text" value={context.userDestination} onChange={handleInput} placeholder="To..." id="to" required />
            <input type="date" value={context.travelDate} onChange={handleDate} id="checkin" />
            <input type="date" value={context.checkoutDate} onChange={handleDate} id="checkout" />
            {/* Button click sends userDestination as argument to function getCityInfo for API call */}
            <Button text="Go!" />
          </form>
          {/* Displaying API results only if user searched at least once */}
          {context.apiLoaded === true &&
          <>
            <h3>You searched for a trip from {context.userOrigin} to {context.userDestination}</h3>
            <p>Please check the according sections to see the weather forecast, suitable flights and the best hotels for your travel destination</p>
          </>
          }
        </>
        }
        {context.apiLoaded === true &&
          <> 
            {context.currentSection === "weather" && <Weather />}
            {context.currentSection === "flights" && <Flights />}
            {context.currentSection === "hotels" && <Hotels />}
          </>
        }
      </div>
    );
}

export default App;
