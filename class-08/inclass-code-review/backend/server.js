'use strict';

console.log('Yasss! Our first server!');

// ***** REQUIRES *******
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

// once express is in we need to use it - per express docs
// app === server
const app = express();

// middleware to share resources across the internet
app.use(cors());


// define my port
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then i know there something wrong with my .env file or i didn't bring in dotenv library

// ***** ENDPOINTS *******

// Base endpoint
app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server');
});

// TODO: Build /weather route and send groomed json data - arr of 3 days of weather { date, description } - to front end
// front-end axios.get(http://localhost:3001/weather?cityName=Seattle&lat=anothervalue&lon=anothervalue)
app.get('/weather', (request, response, next)=>{
  console.log(request);
  let cityName = request.query.cityName;
  let lat = request.query.lat;
  let lon = request.query.lon;
  try {
    let cityData = data.find(city => city.city_name === cityName);
    let groomedData = cityData.data.map(day => new Forecast(day));
    response.status(200).send(groomedData);
  } catch (error) {
    next(error);
  }
});


class Forecast{
  constructor(day){
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}


// catch all and should live at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// ***** ERROR HANDLING ******
// ERRORS
// Handle any errors
app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});

// ***** SERVER START *******
app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`));
