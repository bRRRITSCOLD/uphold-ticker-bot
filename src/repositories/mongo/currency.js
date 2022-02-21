// node_modules
const config = require('config');

// clients
const { mongoClients } = require('../../clients/mongo');

const insertCurrencyPairTickerAlert = async ({ currentyPairTicker, difference, currencyPairConfig }) => {
  const mongoClientConfig = config.get('mongoClient');

  try {
    const mongoClient = mongoClients.getClient(mongoClientConfig.name);

    await mongoClient.collection('currencyPairTickerAlerts').insertOne({
      pair: currentyPairTicker.pair,
      currency: currentyPairTicker.currency,
      ask: +currentyPairTicker.ask,
      bid: +currentyPairTicker.bid,
      spread: +currentyPairTicker.spread,
      price: +currentyPairTicker.price,
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
