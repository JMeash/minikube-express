require('dotenv').config();

const config = {
    PORT: process.env.PORT || '8080',
    API_PATH: process.env.API_PATH || '',
    CAT_API: {
        // Load the api_key from .env to ensure it remains secret
        api_key: process.env.CAT_API_KEY || 'KEY',
        base_url: 'https://api.thecatapi.com/v1',
      },
  };

module.exports = config;
