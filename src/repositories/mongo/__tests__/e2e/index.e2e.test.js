// node_modules
const config = require('config');
const { DockerComposeEnvironment } = require("testcontainers");
const path = require('path');

// domains
const { CurrencyPairTicker } = require('../../../../domains/currency/currency-pair-ticker');

// clients
const { mongoClients } = require('../../../../clients/mongo');

// configs
const mongoClientConfig = config.get('mongoClient');

// testee
const currencyMongoRepo = require('../../currency');

const composeFilePath = path.resolve(__dirname, "docker");
const composeFile = "docker-compose.yml";
let dockerComposeEnvironment;

describe('Currency Mongo "Data" Repository Integration Tests', () => {
  beforeAll(async () => {
    await mongoClients.shutdown();
  });

  describe('#insertCurrencyPairTickerAlert', () => {
    beforeEach(async () => {
      dockerComposeEnvironment = await new DockerComposeEnvironment(composeFilePath, composeFile).up();
      
      await mongoClients.init([mongoClientConfig]);
    });

    afterEach(async () => {
      await mongoClients.shutdown();

      await dockerComposeEnvironment.down()
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

      const mongoClient = mongoClients.getClient(mongoClientConfig.name);
      const cursor = await mongoClient.collection('currencyPairTickerAlerts').find();

      const found = [];
      while (await cursor.hasNext()) {
        found.push(await cursor.next());
      }

      expect(found.length === 1).toBeTruthy();
    });
  });
});
