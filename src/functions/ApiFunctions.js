export const getCoordinates = function(cityName) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${process.env.REACT_APP_WEATHERKEY}`;

  return(
    fetch(url)
    .then((response) => response.json())
    )
}


// Function to get weather forecast from OpenWeather API with geo-coordinates:
export const getWeather = (destinationCoords) => {

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destinationCoords[0].lat}&lon=${destinationCoords[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`;

  return(
  fetch(url)
  .then((response) => response.json())
  )
}


// Function receiving geo-coordinates and dates for check-in & check-out as argument to query hotels API 
export const getHotels = (coords, checkin, checkout) => {

  const url = `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=${coords[0].lon}&latitude=${coords[0].lat}&checkin_date=${checkin}&locale=en-gb&filter_by_currency=EUR&checkout_date=${checkout}&room_number=1&units=metric&adults_number=2&order_by=price&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
    }
  }

  return(
  fetch(url, options)
    .then((response) => response.json())
  )
}


// Function to get airport IATA codes from Aerodatabox API by searching with geo-coordinates:
export const getAirport = (coordinates) => {
  
  const url = `https://aerodatabox.p.rapidapi.com/airports/search/location/${coordinates[0].lat}/${coordinates[0].lon}/km/100/5?withFlightInfoOnly=true`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_HOTELKEY
    }
  }

  return(
  fetch(url, options)
    .then(response => response.json())
  )
}


// Function to see available flights from user origin to destination by Tequila Kiwi API:
export const getFlight = (airportOrigin, airportDestination) => {

  const url = `https://tequila-api.kiwi.com/v2/search?fly_from=${airportOrigin[0].iata}&fly_to=${airportDestination[0].iata}&date_from=05%2F05%2F2022&date_to=15%2F05%2F2022&flight_type=oneway&one_for_city=0&one_per_date=0&adults=1&selected_cabins=C&mix_with_cabins=M&only_working_days=false&only_weekends=false&partner_market=us&curr=EUR&max_stopovers=2&max_sector_stopovers=2&vehicle_type=aircraft&sort=price&limit=50`

  const options = {
    method: 'GET',
    headers: {
      'apikey': process.env.REACT_APP_FLIGHTSKEY
    }
  }

  return(
  fetch(url, options)
  .then(response => response.json())
  )
}
