import React, { useState } from 'react';
import './App.css';

function App() {
  // states for user's current location and travel destination:
  let [userOrigin, setUserOrigin] = useState("");
  let [userDestination, setUserDestination] = useState("");

  // states for all the API data:
  let [weatherData, setWeatherData] = useState({});
  let [hotelData, setHotelData] = useState({});
  let [flightsResult, setFlightsResult] = useState({});
 
  // states for handling the display of different sections & for displaying API results
  let [apiLoaded, setApiLoaded] = useState(false);
  let [currentSection, setCurrentSection] = useState("main");
  // Function to switch which section is displayed on button click
  const switchDisplay = function(section) {
    setCurrentSection(section);
  }


  // Function updating the state variables for origin & destination with the text the user types:
  const handleInput = function(event) {
    event.currentTarget.id === "from" 
      ? setUserOrigin(event.currentTarget.value) 
      : setUserDestination(event.currentTarget.value);
  }


 // Function to get weather forecast from OpenWeather API with geo-coordinates:
 const getWeather = function(destinationCoords) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${destinationCoords[0].lat}&lon=${destinationCoords[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`)
    .then((response) => response.json())
    .then((dataWeather) => {
        setWeatherData(dataWeather);
    })
}


 // Function receiving geo-coordinates as argument to query hotels API 
  const getHotels = function(input) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
      }
    }

    fetch(`https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=${input[0].lon}&latitude=${input[0].lat}&checkin_date=2022-09-30&locale=en-gb&filter_by_currency=AED&checkout_date=2022-10-01&room_number=1&units=metric&adults_number=2&order_by=popularity&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_ages=5%2C0&children_number=2`, options)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(data.result[0].hotel_name)
        setHotelData(data.result);
      })
  }


// Function to get airport IATA codes from Aerodatabox API by searching with geo-coordinates:
const getAirport = function(originCoords, destinationCoords) {
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
        .then(coordsAirportDest => {
        // console.log(data.items);
        getFlight(coordsAirportOrigin.items, coordsAirportDest.items)
        })
    })
}

// Function to see available flights from user origin to destination by Tequila Kiwi API:
const getFlight = function(airportOrigin, airportDestination) {
  const options = {
    method: 'GET',
    headers: {
      'apikey': process.env.REACT_APP_FLIGHTSKEY
    }
  }

  fetch(`https://tequila-api.kiwi.com/v2/search?fly_from=${airportOrigin[0].iata}&fly_to=${airportDestination[0].iata}&date_from=05%2F05%2F2022&date_to=15%2F05%2F2022&flight_type=oneway&one_for_city=0&one_per_date=0&adults=1&selected_cabins=C&mix_with_cabins=M&only_working_days=false&only_weekends=false&partner_market=us&curr=EUR&max_stopovers=2&max_sector_stopovers=2&vehicle_type=aircraft&limit=50`, options)
  .then(response => response.json())
  .then(data => {
    setFlightsResult(data.data)
    console.log(data.data[0])
    // console.log(data.data[0].conversion.EUR)
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
  const getCityInfo = function(event) {
    // prevent page from reloading after submitting form
    event.preventDefault();
    // first get geo-coordinates from Geocoding API according to user input
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userDestination}&appid=${process.env.REACT_APP_WEATHERKEY}`)
    .then((response) => response.json())
    .then((coordsDestination) => {
      // first, get weather for today and next 7 days from OpenWeather API with the coordinates
      getWeather(coordsDestination);
      // second, use geo-coordinates from data to search hotel API with getHotels function
      getHotels(coordsDestination);
       // third, use use geo-coordinates again with userOrigin to search for airport IATA codes
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userOrigin}&appid=${process.env.REACT_APP_WEATHERKEY}`)
        .then((response) => response.json())
        .then((coordsOrigin) => {
          getAirport(coordsOrigin, coordsDestination);
          // update state for API display 
          setApiLoaded(true);
        })
    });
    // emptying the input field by resetting the state variable after getting the API results
    setUserOrigin("");
    setUserDestination("");
  }


  // Function to convert unix timestamps into human-readable dates
  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year;
    //[year] + ' ' + hour + ':' + min + ':' + sec 
    return time;
  }


  return (
    <div className="App">
      <h1>Sandbox API Test</h1>
      <button className='section-btn' onClick={() => switchDisplay("main")}>Search</button>
      {apiLoaded === true && 
      <>      
        <button className='section-btn' onClick={() => switchDisplay("weather")}>Weather</button>
        <button className='section-btn' onClick={() => switchDisplay("flights")}>Flights</button>
        <button className='section-btn' onClick={() => switchDisplay("hotels")}>Hotels</button>
      </>
      }
      {currentSection === "main" &&
      <>
        <h3>Give us a city name and click this button to get the city geo-coordinates</h3>
        <form onSubmit={getCityInfo}>
          <input type="text" value={userOrigin} onChange={handleInput} placeholder="From..." id="from"></input>
          {/* Input updates userDestination state every time the user types something */}
          <input type="text" value={userDestination} onChange={handleInput} placeholder="To..." id="to"></input>
          {/* Button click sends userDestination as argument to function getCityInfo for API call */}
          <button>Go!</button>
        </form>
        {/* Displaying API results only if user searched at least once */}
        {apiLoaded === true &&
        <>
          <h3>You searched for a trip from {userOrigin} to {userDestination}</h3>
          <p>Please check the according sections to see the weather forecast, suitable flights and the best hotels for your travel destination</p>
        </>
        }
      </>
    }

    {currentSection === "weather" && 
     <>
      {apiLoaded === true &&
          <>
              <p><b>City:</b> {userDestination}</p>
              <h3>Current Weather:</h3>
              <p><b>Sky:</b> {weatherData.current.weather[0].main}, {weatherData.current.weather[0].description} | <b>Temperature:</b> {weatherData.current.temp}°</p>
              <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
              alt={weatherData.current.weather[0].description}/>
              {/* Mapping over array with weather forecast */}
              <h1>Forecast</h1>
              {weatherData.daily.map((element, index) => 
              <div className="card" key={index}>
              <p>Date: {timeConverter(element.dt)}</p>
              <p>Temp: {element.temp.day}° | Min: {element.temp.min}° | Max: {element.temp.max}°</p>
              <p>Sky: {element.weather[0].main}, {element.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} />
              </div>
              )}
          </>
        }
     </>
    }

  {currentSection === "flights" && 
     <>
      {apiLoaded === true &&
        flightsResult.map((element, index) => (
        <div className="card" key={index}>
          <p><b>From:</b> {element.cityFrom} | <b>To:</b> {element.cityTo}</p>
          <p><b>Line:</b> {element.airlines[0]} <b>Price:</b> {element.price} Euro</p>
          {/* element.bags_price["1"] */}
        </div>
        ))
      }
    </>
  }

  {currentSection === "hotels" && 
     <>
      {apiLoaded === true &&
        hotelData.map((element, index) => {
          return (
            <div className="card" key={index}>
              <p><b>Hotel name:</b> <i>{element.hotel_name} </i>
              </p>
              <p><b>Hotel address:</b> <i>{element.address}</i>
              </p>
              <p>
              <b>Review:</b> <i>Score: {element.review_score}, Nr of reviews: {element.review_nr}</i></p>
              <p>
              <b>Link to book hotel:</b> <i>{element.url}</i></p>
              <p>
              <b>Best price:</b> <i>{element.price_breakdown.gross_price}, {element.price_breakdown.currency}</i></p>
            </div>
          )
          })
      }
      </>
  }
  </div>
  );
}

export default App;
