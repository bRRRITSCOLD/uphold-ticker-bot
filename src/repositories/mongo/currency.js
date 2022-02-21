// node_modules
const config = require('config');

// clients
const { mongoClients } = require('../../clients/mongo');

const insertCurrencyPairTickerAlert = async ({ currencyPairTicker, difference, currencyPairConfig }) => {
  const mongoClientConfig = config.get('mongoClient');

  try {
    const mongoClient = mongoClients.getClient(mongoClientConfig.name);

    await mongoClient.collection('currencyPairTickerAlerts').insertOne({
      pair: currencyPairTicker.pair,
      currency: currencyPairTicker.currency,
      ask: +currencyPairTicker.ask,
      bid: +currencyPairTicker.bid,
      spread: +currencyPairTicker.spread,
      price: +currencyPairTicker.price,
      difference,
      config: currencyPairConfig,
      timestmp: new Date()
    })

    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertCurrencyPairTickerAlert,
};
