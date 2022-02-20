// testees
const {
  UPHOLD_API_BASE_URL,
  UPHOLD_API_TICKER_ENPOINT,
  upholdHttpClient
} = require('../../uphold');

describe('Uphold Http Client Unit Tests', () => {
  describe('const UPHOLD_API_BASE_URL', () => {
    test('should equal the static base url for uphold api', () => {
      expect(UPHOLD_API_BASE_URL).toBe('https://api.uphold.com/v0');
    });
  });

  describe('const UPHOLD_API_TICKER_ENPOINT', () => {
    test('should equal the staticenpoint', () => {
      expect(UPHOLD_API_TICKER_ENPOINT).toBe('/ticker');
    });
  });

  describe('const upholdHttpClient', () => {
    test('should be a valid uphold api axios instance', () => {
      expect(upholdHttpClient !== undefined).toBeTruthy();
      expect(upholdHttpClient.request !== undefined).toBeTruthy();
      expect(upholdHttpClient.options !== undefined).toBeTruthy();
      expect(upholdHttpClient.head !== undefined).toBeTruthy();
      expect(upholdHttpClient.get !== undefined).toBeTruthy();
      expect(upholdHttpClient.post !== undefined).toBeTruthy();
      expect(upholdHttpClient.put !== undefined).toBeTruthy();
      expect(upholdHttpClient.patch !== undefined).toBeTruthy();
      expect(upholdHttpClient.delete !== undefined).toBeTruthy();
      expect(upholdHttpClient.getUri !== undefined).toBeTruthy();
    });
  })
});
