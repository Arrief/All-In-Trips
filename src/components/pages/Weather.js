import React, { useContext } from 'react';
import '../App.css';
import { MyContext } from '../../context/MyProvider';
import { timeConverter } from '../../functions/TimestampFunctions';

const Weather = () => {
  const context = useContext(MyContext);

  return (
    <div className='App'>
      <div className='weather-container'>
        {/* <img src='/images/' autoPlay loop muted /> */}
        <div className='weather-text'>
          <h1>Weather</h1>
          <br />

          <p><b>City:</b> {context.userDestination}</p>
          <h3>Current Weather:</h3>
          <p><b>Sky:</b> {context.weatherData.current.weather[0].main}, {context.weatherData.current.weather[0].description} | <b>Temperature:</b> {context.weatherData.current.temp}°</p>
          <img src={`http://openweathermap.org/img/wn/${context.weatherData.current.weather[0].icon}.png`}
          alt={context.weatherData.current.weather[0].description}/>
          {/* Mapping over array with weather forecast */}
          <h1>Forecast</h1>
          {context.weatherData.daily.map((element, index) => 
            <div className="card" key={index}>
              <p>Date: {timeConverter(element.dt)}</p>
              <p>Temp: {element.temp.day}° | Min: {element.temp.min}° | Max: {element.temp.max}°</p>
              <p>Sky: {element.weather[0].main}, {element.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${element.weather[0].icon}.png`} alt="images of clouds" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default Weather;
