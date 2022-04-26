// Function to get weather forecast from OpenWeather API with geo-coordinates:
export const GetWeather = (destinationCoords) => {

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${destinationCoords[0].lat}&lon=${destinationCoords[0].lon}&exclude=minutely,hourly&appid=${process.env.REACT_APP_WEATHERKEY}&units=metric`;

  return(
  fetch(url)
  .then((response) => response.json())
  // .then((dataWeather) => (context.setWeatherData(dataWeather)))
  )
}
