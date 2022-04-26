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

  const url= `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?longitude=${coords[0].lon}&latitude=${coords[0].lat}&checkin_date=${checkin}&locale=en-gb&filter_by_currency=EUR&checkout_date=${checkout}&room_number=1&units=metric&adults_number=2&order_by=price&include_adjacency=true&page_number=0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1`;

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
