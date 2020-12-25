require('dotenv').config();

const config = {
    port : process.env.PORT || '8080',
    api_path: process.env.API_PATH || '',
    cat_api: {
        // Load the api_key from .env to ensure it remains secret
        api_key: process.env.CAT_API_KEY || 'KEY',
        base_url: 'https://api.thecatapi.com/v1'
    }
}

module.exports = config;