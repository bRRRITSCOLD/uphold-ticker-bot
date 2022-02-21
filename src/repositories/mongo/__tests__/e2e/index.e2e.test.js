// node_modules
const { execAsync } = require('async-child-process');
const config = require('config');

// domains
const { CurrencyPairTicker } = require('../../../../domains/currency/currency-pair-ticker');

// clients
const { mongoClients } = require('../../../../clients/mongo');

// testee
const currencyMongoRepo = require('../../currency');

describe('Currency Mongo "Data" Repository Integration Tests', () => {
  beforeAll(async () => {
    await mongoClients.shutdown();

    await execAsync('docker-compose -f docker/docker-compose.yml down -v');
  });

  describe('#insertCurrencyPairTickerAlert', () => {
    beforeEach(async () => {
      await execAsync('docker-compose -f docker/docker-compose.yml up -d');
      
      await mongoClients.init([config.get('mongoClient')]);
    });

    afterEach(async () => {
      await mongoClients.shutdown();

      await execAsync('docker-compose -f docker/docker-compose.yml down -v');
    })
  
    test('should insert a currency pair ticker alert into mongo', async () => {
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

      const insertCurrencyPairTickerAlertResponse = await currencyMongoRepo.insertCurrencyPairTickerAlert({
        currencyPairTicker,
        currencyPairConfig,
        difference
      });

      expect(insertCurrencyPairTickerAlertResponse !== undefined).toBeTruthy();
      expect(insertCurrencyPairTickerAlertResponse).toBeTruthy();

      const mongoClient = mongoClients.getClient('dev');
      const cursor = await mongoClient.collection('currencyPairTickerAlerts').find();

      const found = [];
      while (await cursor.hasNext()) {
        found.push(await cursor.next());
      }

      expect(found.length === 1).toBeTruthy();
    });
  });
});
