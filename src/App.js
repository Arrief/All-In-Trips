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
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${process.env.REACT_APP_APIKEY}`)
    .then((response) => response.json())
    .then((data) => {
      setCityData(data);
      // second get weather for today and next 7 days from OpenWeather API
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_APIKEY}&units=metric`)
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
            <p><b>Name:</b> {cityData[0].name} | <b>Lat:</b> {cityData[0].lat} | <b>Long:</b> {cityData[0].lon}</p>
            <p><b>Weather:</b> {weatherData.current.weather[0].main}, {weatherData.current.weather[0].description} | <b>Temperature:</b> {weatherData.current.temp}°</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
            alt={weatherData.current.weather[0].description}/>
            {/* Mapping over array with weather forecast */}
            <h1>Forecast</h1>
            {weatherData.daily.map((element, index) => 
            <div key={index}>
            <p>Date: {timeConverter(element.dt)}</p>
            <p>Temp: {element.temp.day}° | Min: {element.temp.min}° | Max: {element.temp.max}°</p>
            <p>Date:{element.daily.dt} | Weather: {element.weather[0].main}, {element.weather[0].description}</p>
            <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} />
            </div>
            )}
          </>
        : <p>You did not search for anything yet.</p>
      }
    </div>
  );
}


/*URL for one-call current & forecast: 
https://api.openweathermap.org/data/2.5/onecall?lat=52.517&lon=13.3889&exclude=minutely,hourly&appid=fab801f7e2e8bfaec7313b7ef6c6719a&units=metric
*/

export default App;
