const config = require('./config');
const express = require('express');
const { getCatImages } = require('./server/requester');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creates a server
const server = app.listen(config.PORT, () => {
    console.log('Server', process.pid, 'listening on port', config.PORT);
  });

// GET endpoint
app.get(`${config.API_PATH}/search`, async (req, res) => {
    try {
      const result = await getCatImages();
      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

module.exports = server;
