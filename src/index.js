// node_modules
const onExit = require('signal-exit');
const config = require('config');

// domains
const { CurrencyPair } = require('./domains/currency/currency-pair');

// data repositories
const { getCurrencyPairTicker } = require('./repositories/http/uphold');

// libs
const { percentageDifference } = require('./common/utils/number');

// file constants
const currencyPairConfigs = config.get('currencyPairs');
const intervals = [];
const previousCurrencyPairTickers = {};

// process hooks
onExit(() => {
  for (const interval of intervals) {
    clearInterval(interval);
  }

  console.log(`{}Uphold-ticker-bot::exiting program`);
});

// main
(() => {
  try {
    console.log(`{}Uphold-ticker-bot::beginnning execution`);

    const totalRequestsPer5min = currencyPairConfigs.reduce((totalRequests, currencyPairConfig) => {
      totalRequests = totalRequests + ((60 * 5) / (currencyPairConfig.fetchIntervalMs / 1000))
      return totalRequests;
    }, 0);

    if (totalRequestsPer5min > 500) {
      throw new Error('uphold api only allows a total of 500 requests per 5 min (no matter the currency pair)');
    }

    currencyPairConfigs.forEach(currencyPairConfig => {
      intervals.push(setInterval(async () => {
        const currencyPair = new CurrencyPair({ pair: currencyPairConfig.currencyPair });
    
        const currencyPairTicker = await getCurrencyPairTicker(currencyPair);
  
        if ( previousCurrencyPairTickers[currencyPairTicker.pair]) {
          const difference = percentageDifference(
            +previousCurrencyPairTickers[currencyPairTicker.pair].price,
            +currencyPairTicker.price
          );

          if (difference > currencyPairConfig.oscillationPercentage) {
            console.log(`[${new Date().toISOString()}] {}Uphold-ticker-bot::currencyPair=${
              currencyPairTicker.pair
            }::currency=${
              currencyPairTicker.currency
            }::ask=${
              currencyPairTicker.ask
            }::bid=${
              currencyPairTicker.bid
            }::spread=${
              currencyPairTicker.spread
            }::price=${
              currencyPairTicker.price
            }::difference=${difference}`);
          }
        }

        previousCurrencyPairTickers[currencyPairTicker.pair] = currencyPairTicker;
      }, currencyPairConfig.fetchIntervalMs));
    });
  } catch (err) {
    console.log(`{}Uphold-ticker-bot::error executing::err`, err);

    process.exit(1);
  }
})();