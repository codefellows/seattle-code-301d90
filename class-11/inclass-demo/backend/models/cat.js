'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const catSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true},
  spayNeuter: { type: Boolean, required: true },
  location: { type: String, required: true }
});

const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
