'use strict';

const axios = require('axios');

let cache = {};

// TODO: need create a key - for data to store
// TODO: if the things exist AND is in a valid timeframe ...send that data
// TODO: if the the things DO NOT exist - call API & cache the returned data

async function getPhotos(req, res, next){
  try {
    let queryFromFrontEnd = req.query.searchQuery;

    // *** KEY CREATION FOR DATA TO STORE***
    let key = queryFromFrontEnd + 'photo';

    // *** IF data exist AND is in a valid timeframe(cache[key].timestamp) ... send that data
    if(cache[key] && (Date.now() - cache[key].timestamp < 2.628e+9)){

      console.log('Cache was hit, images are present');
      res.status(200).send(cache[key].data);

    } else{
      console.log('Cache missed -- no images present');
      let url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=${queryFromFrontEnd}`;
      let photoResults = await axios.get(url);

      let groomedData = photoResults.data.results.map(pic => new Photo(pic));

      // ** ADD API return to CACHE
      cache[key] = {
        data: groomedData,
        timestamp: Date.now()
      };

      res.status(200).send(groomedData);

    }

  } catch (error) {
    next(error);
  }
}

class Photo {
  constructor(pic){
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;
