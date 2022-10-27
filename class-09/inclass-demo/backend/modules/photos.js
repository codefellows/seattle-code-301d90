'use strict';

const axios = require('axios');

async function getPhotos(req, res, next){
  try {
    let queryFromFrontEnd = req.query.searchQuery;
    let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;
    let photoResults = await axios.get(url);

    let groomedData = photoResults.data.results.map(pic => new Photo(pic));
    res.status(200).send(groomedData);
  } catch (error) {
    next(error);
  }
}

// EXAMPLE BELOW IS NOT NEED FOR TODAY'S LAB BUT FUN TO SEE DIFFERENT REFACTORS

// function getPhotosWithChaining (req, res, next){
//   let queryFromFrontEnd = req.query.searchQuery;
//   let baseURL = 'https://api.unsplash.com/search/photos';
//   let params = {
//     client_id: process.env.UNSPLASH_API_KEY,
//     query: queryFromFrontEnd,
//   };
//   +++++ chaining +++++
//   axios.get(baseURL, { params })
//     .then(photoResults => photoResults.data.results.map(pic => new Photo(pic)))
//     .then(groomedData => res.status(200).send(groomedData))
//     .catch(error => {
//       console.log(error.message);
//       next(error);
//     });
// }


class Photo {
  constructor(pic){
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;
