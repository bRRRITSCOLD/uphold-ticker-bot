const { CurrencyPair } = require('../../currency-pair');

describe('{}CurrencyPair Unit Tests', () => {
  describe('#constructor', () => {
    test('should construct a valid instance of CurrencyPair', () => {
      const currencyPair = new CurrencyPair({
        pair: 'USD-EUR'
      });

      expect(currencyPair instanceof CurrencyPair).toBeTruthy();
      expect(currencyPair.pair !== undefined).toBeTruthy();
      expect(currencyPair.currency !== undefined).toBeTruthy();
    });
  });

  describe('.currency', () => {
    test('should return the currency in which the currency pair prices are given', () => {
      const currencyPair = new CurrencyPair({
        pair: 'USD-EUR'
      });

      expect(currencyPair !== undefined).toBeTruthy();
      expect(currencyPair.currency !== undefined).toBeTruthy();
      expect(currencyPair.currency).toBe('EUR');
    });
  });
});
