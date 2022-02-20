const { isArrayLike } = require('../../array');

describe('Array Utils Unit Tests', () => {
  describe('#isArrayLike', () => {
    test('should return true if a given item has a length (array like - array, string, etc)', () => {
      expect(isArrayLike('Hello world')).toBeTruthy();
      expect(isArrayLike([1])).toBeTruthy();
    });

    test('should return false if a given item does not have a length (array like - array, string, etc)', () => {
      expect(isArrayLike(undefined)).toBeFalsy();
      expect(isArrayLike(null)).toBeFalsy();
      expect(isArrayLike([])).toBeFalsy();
      expect(isArrayLike('')).toBeFalsy();
    });
  });
});
