// domains
const { CurrencyPair } = require('../../domains/currency/currency-pair');
const { CurrencyPairTicker } = require('../../domains/currency/currency-pair-ticker');

// clients
const {
  upholdHttpClient,
  UPHOLD_API_TICKER_ENPOINT
} = require('../../clients/http/uphold');

/**
 *
 *
 * @param {CurrencyPair} currencyPair
 * @returns {CurrencyPairTicker}
 */
const getCurrencyPairTicker = async currencyPair => {
  if (!currencyPair || currencyPair instanceof CurrencyPair === false) {
    throw new Error('provide a valid currency pair')
  }

  try {
    const response = await upholdHttpClient({
      url: `${UPHOLD_API_TICKER_ENPOINT}/${currencyPair.pair}`,
      method: 'GET',
    });

    return new CurrencyPairTicker({
      pair: currencyPair.pair,
      ask: response.data.ask,
      bid: response.data.bid,
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCurrencyPairTicker
}