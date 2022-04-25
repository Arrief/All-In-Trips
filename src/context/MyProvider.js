import React, { useState } from 'react';

export const MyContext = React.createContext();

const MyProvider = (props) => {
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

  return (
    <MyContext.Provider value={{
      userOrigin: userOrigin,
      setUserOrigin: setUserOrigin,
      userDestination: userDestination, 
      setUserDestination: setUserDestination,
      weatherData: weatherData, 
      setWeatherData: setWeatherData,
      hotelData: hotelData, 
      setHotelData: setHotelData,
      flightsResult: flightsResult, 
      setFlightsResult: setFlightsResult,
      apiLoaded: apiLoaded, 
      setApiLoaded: setApiLoaded,
      currentSection: currentSection, 
      setCurrentSection: setCurrentSection,
    }} >
      {props.children}
    </MyContext.Provider>
  )
};

export default MyProvider;