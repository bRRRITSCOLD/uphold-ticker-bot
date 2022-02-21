// node_modules
const config = require('config');
const { DockerComposeEnvironment } = require("testcontainers");
const path = require('path');

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

const composeFilePath = path.resolve(__dirname, "docker");
const composeFile = "docker-compose.yml";
let dockerComposeEnvironment;

describe('Currency Postgres "Data" Repository Integration Tests', () => {
  beforeAll(async () => {
    await postgresClients.shutdown();
  });

  describe('#insertCurrencyPairTickerAlert', () => {
    beforeEach(async () => {
      dockerComposeEnvironment = await new DockerComposeEnvironment(composeFilePath, composeFile).up();

      await delay(3000);

      await postgresClients.init([config.get('postgresClient')]);
    });

    afterEach(async () => {
      await postgresClients.shutdown();

      await dockerComposeEnvironment.down()
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
