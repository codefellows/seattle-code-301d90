'use strict';

// **** REQUIRES *****

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res)=>{
  res.status(200).send('Welcome to my server');
});

app.get('/photos', async (req, res, next)=>{
  try {
    // `http://localhost:3001/photos?searchQuery=kittens
    // TODO: get information from my frontend - keyword (LAB: Weather - lat and lon; Movie - searchQuery)
    let queryFromFrontEnd = req.query.searchQuery;

    // TODO: make an axios call to unsplash(LAB: weather and movie) API and get data back

    // *** FOR YOUR LAB - WEATHER
    // *** http://api.weatherbit.io/v2.0/forecast/daily?key=<your API key>&lat=<from your frontend>&lon=<from your frontend>&day=5&units=F

    // *** FOR YOUR LAB - MOVIES ***
    // *** https://api.themoviedb.org/3/search/movie?api_key=<your MOVIE DB KEY>&query=<city info from frontend>

    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;
    let photoResults = await axios.get(url);

    // TODO: groom that data (using a class) to send back to the frontend!

    let groomedData = photoResults.data.results.map(pic => new Photo(pic));
    res.status(200).send(groomedData);
  } catch (error) {
    next(error);
  }
});

class Photo {
  constructor(pic){
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}


app.get('*', (req, res)=>{
  res.status(404).send('Route does not exist');
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up on ${PORT}`));
