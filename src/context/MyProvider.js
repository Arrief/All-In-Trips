import React, { useState } from 'react';

export const MyContext = React.createContext();

const MyProvider = (props) => {
  // states for user's current location, travel destination & date:
  let [userOrigin, setUserOrigin] = useState("");
  let [userDestination, setUserDestination] = useState("");
  let [travelDate, setTravelDate] = useState("");
  let [checkoutDate, setCheckoutDate] = useState("");

  // states for all the API data:
  let [weatherData, setWeatherData] = useState({});
  let [hotelData, setHotelData] = useState({});
  let [flightsResult, setFlightsResult] = useState({});
 
  // states for handling the display of different sections & for displaying API results
  let [apiLoaded, setApiLoaded] = useState(false);
  let [currentSection, setCurrentSection] = useState("main");
  let [formFilled, setFormFilled] = useState(false);
  let [optionHotels, setOptionHotels] = useState("best price");
  let [optionFlights, setOptionFlights] = useState("best price");

  return (
    <MyContext.Provider value={{
      userOrigin: userOrigin,
      setUserOrigin: setUserOrigin,
      userDestination: userDestination, 
      setUserDestination: setUserDestination,
      travelDate: travelDate,
      setTravelDate: setTravelDate,
      checkoutDate: checkoutDate,
      setCheckoutDate: setCheckoutDate,
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
      formFilled: formFilled,
      setFormFilled: setFormFilled,
      optionHotels: optionHotels,
      setOptionHotels: setOptionHotels,
      optionFlights: optionFlights,
      setOptionFlights: setOptionFlights,
    }} >
      {props.children}
    </MyContext.Provider>
  )
};

export default MyProvider;