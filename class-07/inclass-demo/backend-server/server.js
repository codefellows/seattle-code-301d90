'use strict';

console.log('Yasss! Our first server!');

// ***** REQUIRES *******
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');
const cors = require('cors');

// once express is in we need to use it - per express docs
// app === server
const app = express();

// middleware to share resources across the internet
app.use(cors());


// define my port for my server to listen on
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then i know there something wrong with my .env file or i didn't bring in dotenv library

// ***** ENDPOINTS *******

// Base endpoint - proof of life
// .get() is an express method
// it correlates to axios.get
// the first argument is a URL in quotes,
// the 2nd argument is a callback function
app.get('/', (request, response) => {
  console.log('This is showing up in my terminal!');
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server`);
});

app.get('/pet', (request, response, next)=>{
  try {
    let species = request.query.species;
    let dataToGroom = data.find(pet => pet.species === species);
    let dataToSend = new Pet(dataToGroom);
    response.status(200).send(dataToSend);
  } catch(error){
    // if I have an error, this will create a new instance of the Error Object that lives in Express
    next(error);
  }
});

class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
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
// .listen() is an express method that takes in a PORT value and a callback function - this starts my server
app.listen(PORT, ()=> console.log(`We are up and running on port ${PORT}`));
