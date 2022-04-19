import React, { useState } from 'react';
import './App.css';

function App() {
  // states for user destination and all the API data:
  let [userDestination, setUserDestination] = useState("");
  let [cityData, setCityData] = useState({});
  let [weatherData, setWeatherData] = useState({});
  let [hotelData, setHotelData] = useState({});
 
  // states for handling the display of different sections & for displaying API results
  let [currentSection, setCurrentSection] = useState("main");
  let [apiLoaded, setApiLoaded] = useState(false);

  // Function updating the state variable userDestination with the text the user types
  const handleInput = function(event) {
    setUserDestination(event.currentTarget.value)
  }

  // Function to switch which section is displayed on button click
  const switchDisplay = function(section) {
    setCurrentSection(section);
  }

  // Function receiving geo-coordinates as argument to querying hotels API 
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
  
  // Function to get API results for the city from the text input, on button click:
  const getCityInfo = function(input) {
    // first get geo-coordinates from Geocoding API according to user input
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${process.env.REACT_APP_WEATHERKEY}`)
    .then((response) => response.json())
    .then((data) => {
      setCityData(data);
      // second, use geo-coordinates from data to search hotel API with getHotels function
      getHotels(data);
      // third, get weather for today and next 7 days from OpenWeather API with the coordinates
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`)
      .then((response) => response.json())
      .then((data2) => {
          setWeatherData(data2);
          // update state for API display 
          setApiLoaded(true);
      });
    });
    // emptying the input field by resetting the state variable after getting the API results
    setUserDestination("");
  }

  // Function to convert unix timestamps into human-readable dates
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year;
    //[year] + ' ' + hour + ':' + min + ':' + sec 
    return time;
  }


  return (
    <div className="App">
      <h1>Sandbox API Test</h1>
      {currentSection === "main" &&
      <>
        <button className='section-btn' onClick={() => switchDisplay("weather")}>Weather</button>
        <button className='section-btn' onClick={() => switchDisplay("flights")}>Flights</button>
        <button className='section-btn' onClick={() => switchDisplay("hotels")}>Hotels</button>
        <h3>Give us a city name and click this button to get the city geo-coordinates</h3>
        {/* Input updates userDestination state every time the user types something */}
        <input type="text" value={userDestination} onChange={handleInput}></input>
        {/* Button click sends userDestination as argument to function getCityInfo for API call */}
        <button onClick={() => getCityInfo(userDestination)}>Go!</button>
        {/* Displaying API results only if user searched at least once */}
        {apiLoaded == true &&
        <>
          <h3>You searched for: {cityData[0].name}</h3>
          <p>Please check the according sections to see the weather, suitable flights and the best hotels for your travel destination</p>
        </>
        }
      </>
    }

    {currentSection === "weather" && 
     <>
      <button className='section-btn' onClick={() => switchDisplay("main")}>New Search</button>
      <button className='section-btn' onClick={() => switchDisplay("flights")}>Flights</button>
      <button className='section-btn' onClick={() => switchDisplay("hotels")}>Hotels</button>

      {apiLoaded === true 
          ? <>
              <p><b>City:</b> {cityData[0].name} | <b>Lat:</b> {cityData[0].lat} | <b>Long:</b> {cityData[0].lon}</p>
              <h3>Current Weather:</h3>
              <p><b>Sky:</b> {weatherData.current.weather[0].main}, {weatherData.current.weather[0].description} | <b>Temperature:</b> {weatherData.current.temp}°</p>
              <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
              alt={weatherData.current.weather[0].description}/>
              {/* Mapping over array with weather forecast */}
              <h1>Forecast</h1>
              {weatherData.daily.map((element, index) => 
              <div key={index}>
              <p>Date: {timeConverter(element.dt)}</p>
              <p>Temp: {element.temp.day}° | Min: {element.temp.min}° | Max: {element.temp.max}°</p>
              <p>Sky: {element.weather[0].main}, {element.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} />
              </div>
              )}
            </>
          : <p>You did not search for anything yet.</p>
        }
     </>
    }

  {currentSection === "flights" && 
     <>
      <button className='section-btn' onClick={() => switchDisplay("main")}>New Search</button>
      <button className='section-btn' onClick={() => switchDisplay("weather")}>Weather</button>
      <button className='section-btn' onClick={() => switchDisplay("hotels")}>Hotels</button>
    </>
  }

  {currentSection === "hotels" && 
     <>
      <button className='section-btn' onClick={() => switchDisplay("main")}>New Search</button>
      <button className='section-btn' onClick={() => switchDisplay("weather")}>Weather</button>
      <button className='section-btn' onClick={() => switchDisplay("flights")}>Flights</button>

      {apiLoaded === true
        ? hotelData.map((element, index) => {
          return (
            <div key={index}>
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
              <hr />
            </div>
          )
          })
        : <p>You did not search for anything yet.</p>
      }
      </>
  }
  </div>
  );
}

// const Hotels = function() {
//   let [hotelData, setHotelData] = useState({});
//   let [apiLoaded, setApiLoaded] = useState(false);

//   // options for API fetch
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
//       'X-RapidAPI-Key': REACT_APP_HOTELKEY
//     }
//   };
  
//   // display when site loads, needs to be changed to button click eventually!
//   const getHotels = function() {
//   fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=-73.935242&latitude=40.73061&checkin_date=2022-09-30&locale=en-gb&filter_by_currency=AED&checkout_date=2022-10-01&room_number=1&units=metric&adults_number=2&order_by=popularity&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&children_ages=5%2C0&children_number=2', options)
//     .then(response => response.json())
//     .then(data => {
//       setHotelData(data);
//       // setHotelData(.result[0].address);
//       setApiLoaded(true);
//     })
//     .catch(err => console.error(err));
//   };


//   return (
//     <div className='visa-container'>
//       <video src='/videos/video-hotel.mp4' autoPlay loop muted />
//       <div className='visa-text'>
//         <br />
//         <h1>Hotels</h1>
//         {/* If API is not loaded, display Loading Hotels, else show list of addresses */}
//       { apiLoaded === true 
//       ? hotelData.result.map((element, index) => {
//         return <p key={index}>{element.address}</p>
//         })
//       : <p>Loading Hotels...</p>
//       }
//       <hr />
//          <h3>Where do you want to go?</h3>
//          <button onClick={() => getHotels()}>Go!</button>
//          <br />
//          <br />
//          </div>
//   </div>
//   )
// }


/*URL for one-call current & forecast: 
https://api.openweathermap.org/data/2.5/onecall?lat=52.517&lon=13.3889&exclude=minutely,hourly&appid=fab801f7e2e8bfaec7313b7ef6c6719a&units=metric
*/

export default App;
