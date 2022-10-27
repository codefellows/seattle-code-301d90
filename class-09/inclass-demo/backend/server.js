'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getPhotos = require('./modules/photos');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res)=>{
  res.status(200).send('Welcome to my server');
});

app.get('/photos', getPhotos);

app.get('*', (req, res)=>{
  res.status(404).send('Route does not exist');
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up on ${PORT}`));
