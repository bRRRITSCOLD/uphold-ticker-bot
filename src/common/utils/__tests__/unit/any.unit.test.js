const { isNull, isUndefined } = require('../../any');

describe('Any Utils Unit Tests', () => {
  describe('#isNull', () => {
    test('should return true if a given item is null', () => {
      expect(isNull(null)).toBeTruthy();
    });

    test('should return false if a given item is not null', () => {
      expect(isNull(undefined)).toBeFalsy();
      expect(isNull('hello world!')).toBeFalsy();
      expect(isNull(1)).toBeFalsy();
    });
  });

  describe('#isUndefined', () => {
    test('should return true if a given item is undefined', () => {
      expect(isUndefined(undefined)).toBeTruthy();
    });
  
    test('should return false if a given item is not undefined', () => {
      expect(isUndefined(null)).toBeFalsy();
      expect(isUndefined('hello world!')).toBeFalsy();
      expect(isUndefined(1)).toBeFalsy();
    });
  });
});
