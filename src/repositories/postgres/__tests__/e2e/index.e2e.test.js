// node_modules
const { execAsync } = require('async-child-process');
const config = require('config');

// domains
const { CurrencyPairTicker } = require('../../../../domains/currency/currency-pair-ticker');

// clients
const { postgresClients } = require('../../../../clients/postgres');

// testee
const currencyPostgresRepo = require('../../currency');

const delay = ms => {
  return new Promise(res => {
    setTimeout(() => {
      return res();
    }, ms)
  });
};

describe('Currency Postgres "Data" Repository Integration Tests', () => {
  beforeAll(async () => {
    await postgresClients.shutdown();

    await execAsync('docker-compose -f docker/docker-compose.yml down -v');
  });

  describe('#insertCurrencyPairTickerAlert', () => {
    beforeEach(async () => {
      await execAsync('docker-compose -f docker/docker-compose.yml up -d');
      
      await delay(3000);

      await postgresClients.init([config.get('postgresClient')]);
    });

    afterEach(async () => {
      await postgresClients.shutdown();

      await execAsync('docker-compose -f docker/docker-compose.yml down -v');
    })
  
    test('should insert a currency pair ticker alert into postgres', async () => {
      const currencyPairTicker = new CurrencyPairTicker({
        pair: 'BTC-USD',
        ask: '1.10',
        bid: '1.00'
      });

      const difference = -0.10;

      const currencyPairConfig =  {
        currencyPair: 'BTC-USD',
        fetchIntervalMs: 5000,
        oscillationPercentage: 0.01
      };

      const insertCurrencyPairTickerAlertResponse = await currencyPostgresRepo.insertCurrencyPairTickerAlert({
        currencyPairTicker,
        currencyPairConfig,
        difference
      });

      expect(insertCurrencyPairTickerAlertResponse !== undefined).toBeTruthy();
      expect(insertCurrencyPairTickerAlertResponse).toBeTruthy();

      const postgresClient = postgresClients.getClient('dev');
      const found = await postgresClient.query('select * from currency_pair_ticker_alerts');

      expect(found.rows.length === 1).toBeTruthy();
    });
  });
});
