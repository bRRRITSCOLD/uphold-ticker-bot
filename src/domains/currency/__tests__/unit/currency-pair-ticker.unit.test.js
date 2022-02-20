// domains
const { CurrencyPairTicker } = require('../../currency-pair-ticker');

describe('{}CurrencyPairTicker Unit Tests', () => {
  describe('#constructor', () => {
    test('should construct a valid instance of CurrencyPair', () => {
      const currencyPairTicker = new CurrencyPairTicker({
        bid: '1',
        ask: '1.01',
        pair: 'USD-EUR'
      });

      expect(currencyPairTicker instanceof CurrencyPairTicker).toBeTruthy();
      expect(currencyPairTicker.ask !== undefined).toBeTruthy();
      expect(currencyPairTicker.bid !== undefined).toBeTruthy();
      expect(currencyPairTicker.pair !== undefined).toBeTruthy();
      expect(currencyPairTicker.currency !== undefined).toBeTruthy();
      expect(currencyPairTicker.spread !== undefined).toBeTruthy();
    });
  });

  describe('.spread', () => {
    test('should return the price spread between ask and bid for a given currency pair', () => {
      const currencyPairTicker = new CurrencyPairTicker({
        bid: '1',
        ask: '1.01',
        pair: 'USD-EUR'
      });

      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.spread !== undefined).toBeTruthy();
      expect(currencyPairTicker.spread.includes('.010')).toBeTruthy();
    });
  });

  describe('.price', () => {
    test('should return the price for a given asset in the specified currency of the given currency pair', () => {
      const currencyPairTicker = new CurrencyPairTicker({
        bid: '1',
        ask: '1.01',
        pair: 'USD-EUR'
      });

      expect(currencyPairTicker !== undefined).toBeTruthy();
      expect(currencyPairTicker.price !== undefined).toBeTruthy();
      expect(currencyPairTicker.price).toBe('1.005');
    });
  });
});
