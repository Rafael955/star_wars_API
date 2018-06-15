const axios = require('axios');

const api = axios.create({
  baseURL: 'https://swapi.co/api',
});

module.exports = api;
