const { percentageDifference } = require('../../number');

describe('Number Utils Unit Tests', () => {
  describe('#percentageDifference', () => {
    test('should return the percentage difference between two numbers', () => {
      const diff = percentageDifference(1.10, 1.00);

      expect(diff !== undefined).toBeTruthy();
      expect(typeof diff === 'number').toBeTruthy();
      expect(diff > 9 && diff <= 10).toBeTruthy();
    });

    test('should return the percentage difference between two numbers', () => {
      const diff = percentageDifference(1.00, 1.10);

      expect(diff !== undefined).toBeTruthy();
      expect(typeof diff === 'number').toBeTruthy();
      expect(diff < -9 && diff >= -10).toBeTruthy();
    });
  });
});
