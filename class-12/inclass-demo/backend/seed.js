'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Cat = require('./models/cat.js');

async function seed() {
  // **name: {type: String, required: true},
  // **color: {type: String, required: true},
  // **spayNeuter: {type: Boolean, required: true},
  // **location: {type: String, required: true}

  await Cat.create({
    name: 'Pat the cat',
    color: 'black and white',
    spayNeuter: true,
    location: 'Seattle'
  });

  console.log('Pat the cat was created');

  await Cat.create({
    name: 'Ronald',
    color: 'orange and white',
    spayNeuter: true,
    location: 'Seattle'
  });

  console.log('Ronald was created');

  await Cat.create({
    name: 'Victor',
    color: 'tabby',
    spayNeuter: true,
    location: 'Rainbow Bridge'
  });

  console.log('Victor was created');

  mongoose.disconnect();
}

seed();
