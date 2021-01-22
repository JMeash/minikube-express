const axios = require('axios');
const { CAT_API } = require('../config');

async function getCatImages() {
  try {
    return axios.get(`${CAT_API.base_url}/images/search`, {
        params: {
            // Pass the api_key from config
            api_key: CAT_API.api_key,
          },
      });
  } catch (e) {
    throw new Error('There was an error in the request to 🐈 Cat API');
  }
}

module.exports = {
    getCatImages,
  };
