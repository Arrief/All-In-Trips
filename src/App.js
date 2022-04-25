import React, { useContext } from 'react';
import './App.css';
// import MyProvider from './context/MyProvider';
import Button from './components/Button';
import Hotels from './components/Hotels';
import Weather from './components/Weather';
import { MyContext } from './context/MyProvider';

function App() {
  const context = useContext(MyContext);

  // Function to switch which section is displayed on button click
  const switchDisplay = (section) => (context.setCurrentSection(section));


  // Function updating the state variables for origin & destination with the text the user types:
  const handleInput = (event) => (
    event.currentTarget.id === "from" 
      ? context.setUserOrigin(event.currentTarget.value) 
      : context.setUserDestination(event.currentTarget.value)
  )


 // Function to get weather forecast from OpenWeather API with geo-coordinates:
 const getWeather = (destinationCoords) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${destinationCoords[0].lat}&lon=${destinationCoords[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`)
    .then((response) => response.json())
    .then((dataWeather) => (context.setWeatherData(dataWeather)))
  }


 // Function receiving geo-coordinates as argument to query hotels API 
  const getHotels = (input) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
      }
    }

    fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=${input[0].lon}&latitude=${input[0].lat}&checkin_date=2022-09-30&locale=en-gb&filter_by_currency=AED&checkout_date=2022-10-01&room_number=1&units=metric&adults_number=2&order_by=popularity&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_ages=5%2C0&children_number=2`, options)
      .then(response => response.json())
      .then(data => (context.setHotelData(data.result)))
        // console.log(data)
        // console.log(data.result[0].hotel_name)
  }


// Function to get airport IATA codes from Aerodatabox API by searching with geo-coordinates:
const getAirport = (originCoords, destinationCoords) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
    }
  }

  fetch(`https://aerodatabox.p.rapidapi.com/airports/search/location/${originCoords[0].lat}/${originCoords[0].lon}/km/100/5?withFlightInfoOnly=true`, options)
    .then(response => response.json())
    .then(coordsAirportOrigin => {
      fetch(`https://aerodatabox.p.rapidapi.com/airports/search/location/${destinationCoords[0].lat}/${destinationCoords[0].lon}/km/100/5?withFlightInfoOnly=true`, options)
        .then(response => response.json())
        .then(coordsAirportDest => (getFlight(coordsAirportOrigin.items, coordsAirportDest.items)))
        // console.log(data.items);
    })
}

// Function to see available flights from user origin to destination by Tequila Kiwi API:
const getFlight = (airportOrigin, airportDestination) => {
  const options = {
    method: 'GET',
    headers: {
      'apikey': process.env.REACT_APP_FLIGHTSKEY
    }
  }

  fetch(`https://tequila-api.kiwi.com/v2/search?fly_from=${airportOrigin[0].iata}&fly_to=${airportDestination[0].iata}&date_from=05%2F05%2F2022&date_to=15%2F05%2F2022&flight_type=oneway&one_for_city=0&one_per_date=0&adults=1&selected_cabins=C&mix_with_cabins=M&only_working_days=false&only_weekends=false&partner_market=us&curr=EUR&max_stopovers=2&max_sector_stopovers=2&vehicle_type=aircraft&limit=50`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data.data[0])
    // console.log(data.data[0].conversion.EUR)
    context.setFlightsResult(data.data)
    // update state for API display, this API will be the last one to reply
    context.setApiLoaded(true);
    })
  }

  // ? Function for getting coordinates with geocoding API, now happening in main getCityInfo fn
  // const getCoordinates = function(cityName) {
  //   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.REACT_APP_WEATHERKEY}`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     let coordinates = data;
  //     console.log(coordinates);
  //     return coordinates;
  //   })
  // }

  // Main function to get all API data:
  const getCityInfo = (event) => {
    // prevent page from reloading after submitting form
    event.preventDefault();
    // first get geo-coordinates from Geocoding API according to user input
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${context.userDestination}&appid=${process.env.REACT_APP_WEATHERKEY}`)
    .then((response) => response.json())
    .then((coordsDestination) => {
      // first, get weather for today and next 7 days from OpenWeather API with the coordinates
      getWeather(coordsDestination);
      // second, use geo-coordinates from data to search hotel API with getHotels function
      getHotels(coordsDestination);
       // third, use use geo-coordinates again with userOrigin to search for airport IATA codes
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${context.userOrigin}&appid=${process.env.REACT_APP_WEATHERKEY}`)
        .then((response) => response.json())
        .then((coordsOrigin) => (getAirport(coordsOrigin, coordsDestination)))
      });
      // ! does not show when we want to dispay userOrigin/userDestination if uncommented!
    // emptying the input field by resetting the state variable after getting the API results
    // context.setUserOrigin("");
    // context.setUserDestination("");
  }


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
        <h3>Give us a city name and click this button to get the city geo-coordinates</h3>
        <form onSubmit={getCityInfo}>
          <input type="text" value={context.userOrigin} onChange={handleInput} placeholder="From..." id="from" required />
          {/* Input updates userDestination state every time the user types something */}
          <input type="text" value={context.userDestination} onChange={handleInput} placeholder="To..." id="to" required />
          {/* <input type="date" value="2022-04-01" onChange={handleDate} /> */}
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

      {context.currentSection === "weather" && <Weather />}

      {context.currentSection === "flights" && 
        <>
          {context.apiLoaded === true &&
            context.flightsResult.map((element, index) => (
            <div className="card" key={index}>
              <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
              <p><b>Line:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
              <p><b>Price per bag:</b> {element.bags_price["1"]}</p>
            </div>
            ))
          }
        </>
      }

      {context.currentSection === "hotels" && <Hotels />}
    </div>
  );
}

export default App;
