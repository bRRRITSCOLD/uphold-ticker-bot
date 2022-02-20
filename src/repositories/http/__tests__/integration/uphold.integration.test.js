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
      nock(UPHOLD_API_BASE_URL)
        .get(`${UPHOLD_API_TICKER_ENPOINT}/USD-EUR`)
        .reply(200, JSON.stringify({ ask: '1.01', bid: '1.00', currency: 'USD' }));
  
      const currencyPairTicker = await getCurrencyPairTicker(new CurrencyPair({
        pair: 'USD-EUR'
      }));
  
      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask).toBe('1.01');
      expect(currencyPairTicker.bid !== undefined).toBeTruthy();
      expect(currencyPairTicker.bid).toBe('1.00');
      expect(currencyPairTicker.currency !== undefined).toBeTruthy();
      expect(currencyPairTicker.currency).toBe('EUR');
      expect(currencyPairTicker.spread !== undefined).toBeTruthy();
      expect(currencyPairTicker.spread.includes('.010')).toBeTruthy();
      expect(currencyPairTicker.price !== undefined).toBeTruthy();
      expect(currencyPairTicker.price).toBe('1.005');
    });

    test('should return a given currency pair (EUR-USD) and all its ticker information', async () => {
      nock(UPHOLD_API_BASE_URL)
        .get(`${UPHOLD_API_TICKER_ENPOINT}/EUR-USD`)
        .reply(200, JSON.stringify({ ask: '1.01', bid: '1.00', currency: 'EUR' }));
  
      const currencyPairTicker = await getCurrencyPairTicker(new CurrencyPair({
        pair: 'EUR-USD'
      }));
  
      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask !== undefined).toBeTruthy();
      expect(currencyPairTicker.ask).toBe('1.01');
      expect(currencyPairTicker.bid !== undefined).toBeTruthy();
      expect(currencyPairTicker.bid).toBe('1.00');
      expect(currencyPairTicker.currency !== undefined).toBeTruthy();
      expect(currencyPairTicker.currency).toBe('USD');
      expect(currencyPairTicker.spread !== undefined).toBeTruthy();
      expect(currencyPairTicker.spread.includes('.010')).toBeTruthy();
      expect(currencyPairTicker.price !== undefined).toBeTruthy();
      expect(currencyPairTicker.price).toBe('1.005');
    });
  });
});
