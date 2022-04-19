import React, { useState } from 'react';
import './App.css';

function App() {
  // states for our data:
  let [cityData, setCityData] = useState({});
  let [weatherData, setWeatherData] = useState({});
  let [visaData, setVisaData] = useState({});
  let [userDestination, setUserDestination] = useState("");

  // Function updating the state variable userDestination with the text the user types
  const handleInput = function(event) {
    setUserDestination(event.currentTarget.value)
  }

  // Function to display results of API request when the button was clicked:
  let [apiLoaded, setApiLoaded] = useState(false);
  
  // Function to get API results for the city from the text input, on button click:
  const getCityCoordinates = function(input) {
    // first get geo-coordinates from Geocoding API according to user input
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${process.env.REACT_APP_WEATHERKEY}`)
    .then((response) => response.json())
    .then((data) => {
      setCityData(data);
      // second get weather for today and next 7 days from OpenWeather API
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`)
      .then((response) => response.json())
      .then((data2) => {
          setWeatherData(data2);
          setApiLoaded(true);
      });
    });
    // emptying the input field by resetting the state variable after getting the API results
    setUserDestination("");
  }

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
      <h3>Give us a city name and click this button to get the city geo-coordinates</h3>
      {/* Input updates userDestination state every time the user types something */}
      <input type="text" value={userDestination} onChange={handleInput}></input>
      {/* Button click sends userDestination as argument to function getCityCoordinates for API call */}
      <button onClick={() => getCityCoordinates(userDestination)}>Go!</button>

      {/* Displaying API results only if user searched at least once */}
      {apiLoaded === true 
        ? <>
            <p><b>City:</b> {cityData[0].name} | <b>Lat:</b> {cityData[0].lat} | <b>Long:</b> {cityData[0].lon}</p>
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
