const { isString } = require('../../string');

describe('String Utils Unit Tests', () => {
  describe('#isString', () => {
    test('should return true if a given item is a string (even if empty)', () => {
      expect(isString('Hello world')).toBeTruthy();
      expect(isString('')).toBeTruthy();
    });

    test('should return false if a given item is not a string', () => {
      expect(isString(undefined)).toBeFalsy();
      expect(isString(null)).toBeFalsy();
      expect(isString(1)).toBeFalsy();
    });
  });
});
