'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');

// ** REQUIRE MY MODEL ***

const Cat = require('./models/cat.js');

// ***** FROM MONGOOSE DOCS *****
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// *******************************



// USE
// implement express
const app = express();

// middleware
app.use(cors());
// ! DON'T FORGET THIS!!! - middleware that is a body-parser, it makes the json usable in our code
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// ENDPOINT - Default
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


// ENDPOINT - TO GET ALL CATS FROM THE DATABASE - SEND IT TO OUR FRONT END
app.get('/cats', getCats);

async function getCats(request, response, next){
  try {
    let results = await Cat.find();

    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

// ENDPOINT TO ADD CATS
app.post('/cats', postCats);

async function postCats(request, response, next){
  try {
    // request.body
    console.log(request.body);
    let createdCat = await Cat.create(request.body);
    response.status(200).send(createdCat);
  } catch (error) {
    next(error);
  }
}

// ENDPOINT TO DELETE CATS
// we must have path parameter
// we will use a variable to capture that id
// to create that variabble we add ':<variable-name>' in place of the path value
app.delete('/cats/:catID', deleteCats);

async function deleteCats(request,response, next){
  console.log(request.params);
  console.log(request.params.catID);
  try {
    let id = request.params.catID;
    await Cat.findByIdAndDelete(id);
    response.status(200).send('Cat was deleted');
  } catch (error) {
    next(error);
  }
}

// ENDPOINT - TO UPDATE A CAT
app.put('/cats/:catID', updateCat);

async function updateCat(request, response, next){
  try {
    // REQUEST.PARAMS & REQUEST.BODY
    let id = request.params.catID;
    let data = request.body;

    // findByIdAndUpdate - 3 arguments
    // 1. id of the thing to update
    // 2. updated data
    // 3 option object - { new: true, overwrite: true }

    const updatedCat = await Cat.findByIdAndUpdate(id, data, { new: true, overwrite: true });

    response.status(200).send(updatedCat);

  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
