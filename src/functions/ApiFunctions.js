// Template for an API call with fetch
const fetchApiCall = (url, options) =>
  fetch(url, options)
  .then((response) => {
    if (response.status !== 200) {
      return console.log("An error happened!");
    } else {
     return response.json()
    }
  });


// Function to get the geo-coordinates for a city from OpenWeather Geocoding API
export const getCoordinates = function(origin, destination) {
  const urlOrigin = `http://api.openweathermap.org/geo/1.0/direct?q=${origin}&appid=${process.env.REACT_APP_WEATHERKEY}`;

  const urlDestination = `http://api.openweathermap.org/geo/1.0/direct?q=${destination}&appid=${process.env.REACT_APP_WEATHERKEY}`;

  return Promise.all([fetchApiCall(urlOrigin), fetchApiCall(urlDestination)]);
}


// Function to get weather forecast from OpenWeather OneCall API with geo-coordinates:
export const getWeather = (destinationCoords) => {

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destinationCoords[0].lat}&lon=${destinationCoords[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`;

  return(fetchApiCall(url));
}


// Function receiving geo-coordinates and dates for check-in & check-out as argument to query hotels API 
export const getHotels = (coords, checkin, checkout) => {

  const url = `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=${coords[0].lon}&latitude=${coords[0].lat}&checkin_date=${checkin}&locale=en-gb&filter_by_currency=EUR&checkout_date=${checkout}&room_number=1&units=metric&adults_number=1&order_by=price&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
    }
  }

  return(fetchApiCall(url, options));
}


// Function to get airport IATA codes from Aerodatabox API by searching with geo-coordinates:
export const getAirports = (origin, destination) => {
  
  const urlOrigin = `https://aerodatabox.p.rapidapi.com/airports/search/location/${origin[0].lat}/${origin[0].lon}/km/100/5?withFlightInfoOnly=true`;

  const urlDestination = `https://aerodatabox.p.rapidapi.com/airports/search/location/${destination[0].lat}/${destination[0].lon}/km/100/5?withFlightInfoOnly=true`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
    }
  }

  return Promise.all([fetchApiCall(urlOrigin), fetchApiCall(urlDestination)]);
}


// Function to see available flights from user origin to destination by Tequila Kiwi API:
export const getFlight = (airportOrigin, airportDestination, dayOfFlight) => {

  // Special case for traveling from or to Berlin: 2 old airports are closed, only new BER airport is active and APIs are not updated yet
  if (airportOrigin[0].iata === "TXL" || airportOrigin[0].iata === "SXF") {
    airportOrigin[0].iata = "BER";
  }

  if (airportDestination[0].iata === "TXL" || airportDestination[0].iata === "SXF") {
    airportDestination[0].iata = "BER";
  }

  const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${airportOrigin[0].iata}&fly_to=${airportDestination[0].iata}&date_from=${dayOfFlight}&date_to=${dayOfFlight}&flight_type=oneway&one_for_city=0&one_per_date=0&adults=1&children=0&selected_cabins=C&mix_with_cabins=M&only_working_days=false&only_weekends=false&partner_market=us&curr=EUR&max_stopovers=2&max_sector_stopovers=2&vehicle_type=aircraft&sort=price&limit=50`;

  const options = {
    method: 'GET',
    headers: {
      'apikey': process.env.REACT_APP_FLIGHTSKEY
    }
  }

  return(fetchApiCall(url, options));
}
