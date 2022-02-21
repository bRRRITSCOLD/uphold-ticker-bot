// node_modules
const config = require('config');

// clients
const { postgresClients } = require('../../clients/postgres');

const insertCurrencyPairTickerAlert = async ({ currencyPairTicker, difference, currencyPairConfig }) => {
  const postgresClientConfig = config.get('postgresClient');

  try {
    const pgClient = postgresClients.getClient(postgresClientConfig.name);

    await pgClient.query(
      `INSERT INTO currency_pair_ticker_alerts (pair, currency, ask, bid, spread, price, difference, config, timestmp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
      { params: [
        currencyPairTicker.pair,
        currencyPairTicker.currency,
        +currencyPairTicker.ask,
        +currencyPairTicker.bid,
        +currencyPairTicker.spread,
        +currencyPairTicker.price,
        difference,
        currencyPairConfig,
        new Date()
      ] }
    );

    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insertCurrencyPairTickerAlert,
};
