// node_modules
const onExit = require('signal-exit');
const config = require('config');

// clients
const { postgresClients } = require('./clients/postgres');
const { mongoClients } = require('./clients/mongo');

// data repositories
const upholdHttpRepo = require('./repositories/http/uphold');
const currencyPostgresRepo = require('./repositories/postgres/currency');
const currencyMongoRepo = require('./repositories/mongo/currency');

// libs
const { percentageDifference } = require('./common/utils/number');

// domains
const { CurrencyPair } = require('./domains/currency/currency-pair');

// file constants
const currencyPairConfigs = config.get('currencyPairs');
const postgresClientConfig = config.get('postgresClient');
const mongoClientConfig = config.get('mongoClient');
const intervals = [];
const previousCurrencyPairTickers = {};

// process hooks
onExit(() => {
  for (const interval of intervals) {
    clearInterval(interval);
  }

  Promise
    .all([postgresClients.shutdown(), mongoClients.shutdown()])
    .then(() => {});

  console.log(`{}Uphold-ticker-bot::exiting program`);
});

// main
(async () => {
  try {
    console.log(`{}Uphold-ticker-bot::beginnning execution`);

    // calculate requests per 5 min because the uphold api throttles at 500 per 5 min
    const totalRequestsPer5min = currencyPairConfigs.reduce((totalRequests, currencyPairConfig) => {
      totalRequests = totalRequests + ((60 * 5) / (currencyPairConfig.fetchIntervalMs / 1000))
      return totalRequests;
    }, 0);

    if (totalRequestsPer5min > 500) {
      throw new Error('uphold api only allows a total of 500 requests per 5 min (no matter the currency pair)');
    }

    await Promise.all([
      postgresClients.init([postgresClientConfig]),
      mongoClients.init([mongoClientConfig])
    ]);

    currencyPairConfigs.forEach(async currencyPairConfig => {
      // pre fetch the data on start up to have starting point
      const currencyPair = new CurrencyPair({ pair: currencyPairConfig.currencyPair });

      const currencyPairTicker = await upholdHttpRepo.getCurrencyPairTicker(currencyPair);

      previousCurrencyPairTickers[currencyPairTicker.pair] = currencyPairTicker;

      // fetch data on a given interval of ms
      intervals.push(setInterval(async () => {
        const intervalCurrencyPair = new CurrencyPair({ pair: currencyPairConfig.currencyPair });
    
        const intervalCurrencyPairTicker = await upholdHttpRepo.getCurrencyPairTicker(intervalCurrencyPair);
  
        if (previousCurrencyPairTickers[intervalCurrencyPairTicker.pair]) {
          const difference = percentageDifference(
            +previousCurrencyPairTickers[intervalCurrencyPairTicker.pair].price,
            +intervalCurrencyPairTicker.price
          );

          if (difference >= currencyPairConfig.oscillationPercentage) {
            await Promise.all([
              currencyPostgresRepo.insertCurrencyPairTickerAlert({
                currentyPairTicker: intervalCurrencyPairTicker,
                difference,
                currencyPairConfig: currencyPairConfig
              }),
              currencyMongoRepo.insertCurrencyPairTickerAlert({
                currentyPairTicker: intervalCurrencyPairTicker,
                difference,
                currencyPairConfig: currencyPairConfig
              })
            ])
        
            console.log(`[${new Date().toISOString()}] {}Uphold-ticker-bot::pair=${
              intervalCurrencyPairTicker.pair
            }::currency=${
              intervalCurrencyPairTicker.currency
            }::ask=${
              intervalCurrencyPairTicker.ask
            }::bid=${
              intervalCurrencyPairTicker.bid
            }::spread=${
              intervalCurrencyPairTicker.spread
            }::price=${
              intervalCurrencyPairTicker.price
            }::difference=${difference}`);
          }
        }

        previousCurrencyPairTickers[intervalCurrencyPairTicker.pair] = intervalCurrencyPairTicker;
      }, currencyPairConfig.fetchIntervalMs));
    });
  } catch (err) {
    console.log(`{}Uphold-ticker-bot::error executing::err`, err);

    process.exit(1);
  }
})();