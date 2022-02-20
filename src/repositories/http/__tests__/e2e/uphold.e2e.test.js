// node_modules
const nock = require('nock');

// domains
const { CurrencyPair } = require('../../../../domains/currency/currency-pair');

// clients
const { upholdHttpClient, UPHOLD_API_BASE_URL, UPHOLD_API_TICKER_ENPOINT } = require('../../../../clients/http/uphold');

// testee
const {
  getCurrencyPairTicker
} = require('../../uphold');

// needed to intercept http calls
upholdHttpClient.defaults.adapter = require('axios/lib/adapters/http');

describe('Uphold Http "Data" Repository Integration Tests', () => {
  describe('#getCurrencyPairTicker', () => {
    beforeEach(() => {
      nock.restore();
  
      nock.activate();
    });

    test('should return a given currency pair (USD-EUR) and all its ticker information', async () => {
      const currencyPairTicker = await getCurrencyPairTicker(new CurrencyPair({
        pair: 'USD-EUR'
      }));
  
      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask !== undefined || currencyPairTicker.ask !== null).toBeTruthy();
      expect(currencyPairTicker.bid !== undefined || currencyPairTicker.bid !== null).toBeTruthy();
      expect(currencyPairTicker.currency !== undefined || currencyPairTicker.currency !== null).toBeTruthy();
      expect(currencyPairTicker.currency).toBe('EUR');
      expect(currencyPairTicker.spread !== undefined || currencyPairTicker.spread !== null).toBeTruthy();
      expect(currencyPairTicker.price !== undefined || currencyPairTicker.price !== null).toBeTruthy();
    });

    test('should return a given currency pair (EUR-USD) and all its ticker information', async () => {
      const currencyPairTicker = await getCurrencyPairTicker(new CurrencyPair({
        pair: 'EUR-USD'
      }));
  
      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask !== undefined || currencyPairTicker.ask !== null).toBeTruthy();
      expect(currencyPairTicker.bid !== undefined || currencyPairTicker.bid !== null).toBeTruthy();
      expect(currencyPairTicker.currency !== undefined || currencyPairTicker.currency !== null).toBeTruthy();
      expect(currencyPairTicker.currency).toBe('USD');
      expect(currencyPairTicker.spread !== undefined || currencyPairTicker.spread !== null).toBeTruthy();
      expect(currencyPairTicker.price !== undefined || currencyPairTicker.price !== null).toBeTruthy();
    });
  });
});
