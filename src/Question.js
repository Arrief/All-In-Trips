import React, {useContext} from 'react';
import './App.css';
import Weather from './components/pages/Weather';
import { getCoordinates, getWeather, getHotels, getAirports, getFlight } from './functions/ApiFunctions';
import { MyContext } from './context/MyProvider';
import Flights from './components/pages/Flights';
import Hotels from './components/pages/Hotels';
import Button from './components/Button';
import Spinner from './components/Spinner';


const Question = () => {
  const context = useContext(MyContext);

  // Function to switch which section is displayed on button click
  const switchDisplay = (section) => (context.setCurrentSection(section));


  // Function updating the state variables for check-in & check-out with the date the user selects:
  const handleInput = (event) => {
    if (event.currentTarget.id === "from") {
      context.setUserOrigin(event.currentTarget.value);
    } else if(event.currentTarget.id === "to") {
      context.setUserDestination(event.currentTarget.value)
    } else if (event.currentTarget.id === "checkin") {
      context.setTravelDate(event.currentTarget.value);
    } else {
      context.setCheckoutDate(event.currentTarget.value)
    }
  }
  

  // Main function to get all API data:
  const getCityInfo = (event) => {
    // prevent page from reloading after submitting form
    event.preventDefault();
    // reset apiLoaded state to false again if the user already made a search before
    context.setApiLoaded(false);
    // update state for the loading spinner
    context.setFormFilled(true);
    // first get geo-coordinates for origin & destination from Geocoding API according to user input
    getCoordinates(context.userOrigin, context.userDestination)
    .then(([coordsOrigin, coordsDestination]) => {
      // second, get weather for today and next 7 days from OpenWeather API with the coordinates
      getWeather(coordsDestination)
      .then((dataWeather) => (context.setWeatherData(dataWeather)))
      // third, use geo-coordinates from data to search hotel API with getHotels function
      getHotels(coordsDestination, context.travelDate, context.checkoutDate)
      .then((dataHotels) => {
        console.log(dataHotels.result);
        context.setHotelData(dataHotels.result)})
       // fourth, use the geo-coordinates again to search for airport IATA codes
        getAirports(coordsOrigin, coordsDestination)
          .then(([originIata, destIata]) => {
            // fifth, use IATA codes & travel date to search cheap flights
            getFlight(originIata.items, destIata.items, context.travelDate)
            .then(dataFlights => {
              console.log(dataFlights.data)
              context.setFlightsResult(dataFlights.data)
              // update state for API display, this API will be the last one to reply
              context.setApiLoaded(true);
              })
          })
      })
  }

  return (
    <>
    <div className="App">
      <Button style='section-btn' action={() => switchDisplay("main")} text="Search" />
      {/* Buttons only show after the user did a search */}
      {context.apiLoaded === true && 
      <>
        <Button style='section-btn' action={() => switchDisplay("weather")} text="Weather" />    
        <Button style='section-btn' action={() => switchDisplay("flights")} text="Flights" />
        <Button style='section-btn' action={() => switchDisplay("hotels")} text="Hotels" />
      </>
      }
       
      {context.currentSection === "main" &&
      <>
   
        <form onSubmit={getCityInfo}>
          {/* Input fields update all states for the user data when the user types/selects & submits the form */}
          <input 
          type="text" 
          value={context.userOrigin} 
          onChange={handleInput} 
          placeholder="From..." 
          id="from" 
          required />

          <input 
          type="text" 
          value={context.userDestination} 
          onChange={handleInput} 
          placeholder="To..." 
          id="to" 
          required />

          <input 
          type="date" 
          value={context.travelDate} 
          onChange={handleInput} 
          id="checkin" 
          required />

          <input 
          type="date" 
          value={context.checkoutDate} 
          onChange={handleInput} 
          id="checkout" 
          required />
          <Button style='section-btn' text="Go!" />
          <br />
          <br />
        </form>
        {/* Displaying API results only if user searched at least once */}
        {context.apiLoaded === true
          ?
          (<>
            <h3>You searched for a trip from {context.userOrigin} to {context.userDestination}</h3>
            <p>Please check the according sections to see the weather forecast, flights and the best hotels for your travel destination</p><br/> <br/>
          </>)
          // loading spinner if the user submitted a search but API response has not arrived yet
          : (context.formFilled && (

            <Spinner />
          )) 
               }
          </>   
             }
            {/* All sections with API results show after the user searched and all API data is available */}
            {context.apiLoaded === true &&
          <> 
            {context.currentSection === "weather" && <Weather />}
            {context.currentSection === "flights" && <Flights />}
            {context.currentSection === "hotels" && <Hotels />}
          </>
        }
    </div>
    </>  
  );
}

export default Question;
