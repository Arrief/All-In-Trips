import React, { useState } from 'react';
import '../../App.css';
import { timeConverter } from '../../functions/TimestampFunctions';

const WeatherStart = () => {
  // states for our data:
 let [cityData, setCityData] = useState({});
 let [weatherData, setWeatherData] = useState({});
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
   fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=fab801f7e2e8bfaec7313b7ef6c6719a`)
   .then((response) => response.json())
   .then((data) => {
     setCityData(data);
     // second get weather for today and next 7 days from OpenWeather API
     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely,hourly&appid=fab801f7e2e8bfaec7313b7ef6c6719a&units=metric`)
     .then((response) => response.json())
     .then((data2) => {
         setWeatherData(data2);
         setApiLoaded(true);
     });
   });
   // emptying the input field by reseting the state variable after getting the API results
   setUserDestination("");
 }

  return (
       <div className='weather-container'>
         <img className="img-landing" src='/images/img-weather2.png' autoPlay loop muted />
      <div className='weather-text'>
      <br />
      <br />
      <h1>Weather</h1>
      <br />
      <h3>Which city do you want to travel to?</h3>
      <br />
      {/* Input updates userDestination state every time the user types something */}
      <input type="text" value={userDestination} onChange={handleInput}></input>
      {/* Button click sends userDestination as argument to function getCityCoordinates for API call */}
      <button buttonStyle='btn--outline'>
      <button onClick={() => getCityCoordinates(userDestination)}><p>Go!</p></button>
      </button>
      <br />
      <br />
      {/* Displaying API results only if user searched at least once */}
      {apiLoaded === true 
        ? <>
            <p><b>City:</b> <i>{cityData[0].name} </i>
            {/* | <b>Lat:</b> {cityData[0].lat} | <b>Long:</b> {cityData[0].lon} */}
            </p>
            <p><b>Sky:</b> <i>{weatherData.current.weather[0].main}</i>
            {/* {weatherData.current.weather[0].description} |  */}
            </p>
            <p>
            <b>Temperature:</b> <i>{weatherData.current.temp}°</i></p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
            alt={weatherData.current.weather[0].description}/>
            {/* Mapping over array with weather forecast */}
       
            <h1>Forecast</h1>
            {weatherData.daily.map((element, index) => 
            <div>
            <p key={index}> {timeConverter(element.dt)} 
            <p> Temp: <i>{element.temp.day}°</i> | Min: <i>{element.temp.min}°</i> | Max: <i>{element.temp.max}°</i></p></p>
            <p>Sky: <i>{element.weather[0].main}</i>
            {/* {element.weather[0].description} */}
            </p>
            <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} />
            </div>
               
            )}
          </>
        : 
        <p></p>
         }
      </div>
    </div>
  )
};

export default WeatherStart;
