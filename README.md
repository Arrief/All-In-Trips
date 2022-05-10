# All in Trips
## A complete guide for travelers 

## Introduction

All in Trips is a React-based web app, allowing you to quickly look up the weather, flights and hotels for your next travel destination - all in one place and all with just one search!

Several APIs provide detailed data like a weather forecast for the next week, cheap flights from your nearest airport complete with prices, departure time and flight duration, as well as a list of hotels complete with a preview image, user rating and a link to Booking.com. 

You can also sort the result based on your preferences, for example to see the shortest flight duration or the hotels closest to the city center first.

## Features

- Search once, get all results! Separate weather search optionally.
- Get the current weather and a one-week-forecast for a destination of your choice.
- Check the details about flights from your nearest airport to your destination
- Detailed overview of available hotels for the entire duration of your stay
- Sort flights and hotels according to your preferences

## Demo

Live demo on Netlify: https://all-in-trips.netlify.app/

<img src="./public/images/screenshot1.png" width="600" height="400">

## Installation
If you want to run the code locally, you have to register on the websites of the API providers, listed below, and request your own API keys. Once you have them, replace the fake values inside the file **.env.sample** with your keys and rename the file into **.env**. 

After that you can open your terminal, cd into the project directory and run the command `npm install` to get all the necessary node_module files. After that, you can launch the app with the command `npm start`.

## Tools

- [React v18.1.0 & Create React App]
- [JavaScript]
- [HTML & CSS]
- [Visual Studio Code]
- [Github]
- [Netlify]
- [Jira]
- [InVision]

## APIs 

- OpenWeather Geocoding: https://openweathermap.org/api/geocoding-api
- OpenWeather One Call: https://openweathermap.org/api/one-call-api
- AeroDataBox Airport API (search airport by location): https://rapidapi.com/aedbx-aedbx/api/aerodatabox
- Booking com (search hotels by coordinates): https://rapidapi.com/tipsters/api/booking-com/
- Kiwi's Tequila API (Search API for flights): https://tequila.kiwi.com/portal/docs/tequila_api/search_api


## The team

- Arne Rief (https://github.com/Arrief)
- Jessica Povoa (www.lembra.tv)
- Julia Feller (https://github.com/fejul)

## Development
This project was created in a time span of one month as a part of [Wild Code School's](https://www.wildcodeschool.com/en-GB) web development bootcamp.

## Possibilites for the future
- Optimize the responsive layout for phones
- Implement map API for hotels
- Convert airline IATA codes to airline names with another API 
- Create a 404 page/component if the API calls fail
