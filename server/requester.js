const axios = require('axios');
const {cat_api} = require('../config');

async function getCatImages() {
    try {
        return axios.get(`${cat_api.base_url}/images/search`, {
            params: {
                // Pass the api_key from config
                api_key: cat_api.api_key,
            }
        });
    } catch (e) {
        throw new Error('There was an error in the request to 🐈 Cat API');
    }
}

module.exports = {
    getCatImages,
};