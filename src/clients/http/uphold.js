const { default: axios } = require("axios");

const UPHOLD_API_BASE_URL = 'https://api.uphold.com/v0'
const UPHOLD_API_TICKER_ENPOINT = '/ticker'

const upholdHttpClient = axios.create({
  baseURL: UPHOLD_API_BASE_URL,
});

module.exports = {
  UPHOLD_API_BASE_URL,
  UPHOLD_API_TICKER_ENPOINT,
  upholdHttpClient
};